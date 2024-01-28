"use client";

import { ModeToggle } from "@/components/mode_toggle";
import Sidebar from "@/components/sidebar";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogDescription, AlertDialogTitle, AlertDialogCancel, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { Cloud } from "lucide-react";
import { useParams } from "next/navigation";

const STUDENT = "STUDENT"
const PROF = "PROF"

const ProfilePage = () => {
    const { user } = useUser();
    const params = useParams<{userId: string}>();
    const userData = useQuery(api.user.getByUserId, {
        userId: params.userId || "Error"
    });

    const isYourPage = user?.id === params.userId
    const userType = userData?.userType
    const userUrl = userData?.url;
    const formattedUserUrl = userUrl && !userUrl.startsWith('http://') && !userUrl.startsWith('https://')
        ? `https://${userUrl}`
        : userUrl;
    
    return ( 
        <div className="flex">
            <Sidebar />
            <div className="fixed top-0 p-4 right-0"><ModeToggle /></div>
        <div className="flex flex-col items-left justify-left pl-48 pt-20">
            <div className="bg-gray-300 dark:bg-neutral-700 p-6 pr-7 flex flex-row w-30 h-30 items-center justify-between rounded-3xl">
                {/* <img src={user?.imageUrl} className="h-16 rounded-full w-16" alt="pfp" /> */}
                <div className="flex flex-col">
                    {isYourPage && <span className="pb-3">Welcome, </span>}
                    <span className="font-bold text-3xl pb-2">{userData?.name}</span>
                    {userType === PROF ? (
                        <i className="text-muted-foreground">Research Focus: {userData?.major}</i>
                    ) : (
                        <i className="text-muted-foreground">{userData?.major}, Class of {userData?.year}</i>
                    )}
                    <a href={formattedUserUrl} target="_blank" className="underline pt-2 text-customDarkBlue dark:text-customLightBlue">{userData?.url}</a>
                </div>
            </div>
            <div className="pt-5"></div>
            { userData?.resume_url && (
                <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Show Resume</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>View {userData.name}&apos;s Resume</AlertDialogTitle>
                    <AlertDialogDescription>
                      Clicking &quot;Open&quot; will show <a className="underline" href={userData.resume_url} target="_blank">Resume URL</a> in New Tab
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Back</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {window.open(userData.resume_url)}}>Open</AlertDialogAction>
                    <AlertDialogAction><Cloud className="pr-[4px]" /> Review with AI</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <div className="pt-5"></div>
                <div className="bg-gray-300 dark:bg-neutral-700 p-6 max-w-[500px] rounded-3xl text-wrap break-words">
                    <b>Bio: </b>{userData?.bio}
                </div>
            <div className="pt-5"></div>
            { userType === STUDENT ? (
                <div className="flex flex-row gap-x-2">
                    {userData?.skills?.map(skill => (
                        <div key={skill} className="bg-gray-300 text-muted-foreground dark:bg-neutral-700 p-3 max-w-[500px] rounded-xl text-wrap break-words">
                            {skill}
                        </div>
                    ))}
                </div>
                ) : (
                    <div>
                    </div>
                )
            }
        </div>
        </div>
     );
}
 
export default ProfilePage;