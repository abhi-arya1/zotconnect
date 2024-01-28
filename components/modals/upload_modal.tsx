"use client"; 

import { 
    Dialog,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog"; 
import { FileState, MultiFileDropzone } from "../MultiFileDropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useResume } from "@/hooks/use-file-upload";

export const UploadResumeModal = () => {
    const [files, setFiles] = useState<FileState[]>();
    const resume = useResume()
    const { edgestore } = useEdgeStore();

    const { user } = useUser();
    const userData = useQuery(api.user.getByUserId, {
        userId: user?.id || "Err",
    });
    const addResume = useMutation(api.user.addResume)


    const onChange = async (files: FileState[]) => {
        const file = files[0].file;
        if (file) {
            setFiles(files);
            let res;

            if (userData?.resume_url) {
                res = await edgestore.publicFiles.upload({
                    file,
                    options: {
                        replaceTargetUrl: userData?.resume_url
                    }
                })
            } else {
                res = await edgestore.publicFiles.upload({
                    file
                });
            }

            await addResume({
                userId: user?.id || "Err",
                resumeUrl: res.url || "Err"
            })

            onClose();
        }
    }

    const onClose = () => {
        setFiles(undefined);
        resume.onClose()
    }

    function updateFileProgress(key: string, progress: FileState['progress']) {
        setFiles((files) => {
          const newFileStates = structuredClone(files);
          if(newFileStates !== undefined) {
            const fileState = newFileStates.find(
                (fileState) => fileState.key === key,
            );
            if (fileState) {
                fileState.progress = progress;
            }
            return newFileStates;
        }
        });
      }

    return (
        <Dialog open={resume.isOpen} onOpenChange={onClose}>
            <DialogContent className="items-center justify-center bg-gray-300 dark:bg-neutral-700">
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">
                        Cover Image
                    </h2>
                </DialogHeader>
                <div>
                <MultiFileDropzone
                    value={files}
                    onChange={(files) => {onChange(files)}}
                    onFilesAdded={async (addedFiles) => {
                    if(files) {
                        setFiles([...files, ...addedFiles]);
                    }
                    await Promise.all(
                        addedFiles.map(async (addedFileState) => {
                        try {
                            const res = await edgestore.publicFiles.upload({
                            file: addedFileState.file,
                            onProgressChange: async (progress) => {
                                updateFileProgress(addedFileState.key, progress);
                                if (progress === 100) {
                                // wait 1 second to set it to complete
                                // so that the user can see the progress bar at 100%
                                await new Promise((resolve) => setTimeout(resolve, 1000));
                                updateFileProgress(addedFileState.key, 'COMPLETE');
                                }
                            },
                            });
                        } catch (err) {
                            updateFileProgress(addedFileState.key, 'ERROR');
                        }
                        }),
                    );
                    }}/>
                </div>
            </DialogContent>
        </Dialog>
    )
}