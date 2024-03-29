import React from 'react';
import Image from 'next/image';
import { DoorOpen, PencilLine, FilePlus, NotepadText, LogOut, UserRound } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { useClerk, useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useResume } from '@/hooks/use-file-upload';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"


const Sidebar: React.FC = () => {
    const router = useRouter();
    const { user } = useUser();
    const { signOut } = useClerk();
    const resume = useResume();

    const userData = useQuery(api.user.getByUserId, {
        userId: user?.id || "Error"
    });

    const userType = userData?.userType;

    return (
        <div className="fixed left-0 top-0">
        <div className="flex flex-col items-center justify-between h-screen w-20 p-15 bg-gray-300 dark:bg-neutral-700 rounded-r-3xl shadow-xl pt-3">
            <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    <Button variant='ghost' className="hover:bg-gray-300 dark:hover:bg-neutral-700 hover:cursor-pointer hover:rounded-r-3xl" onClick={() => {router.push('/posts')}}>
                        <Image 
                            src="/petrhead.png"
                            alt="Logo"
                            width={50}
                            height={40}
                            style={{ borderRadius: '10px', cursor: 'pointer' }}
                        />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                <p>Go to Posts</p>
                </TooltipContent>
            </Tooltip>
            </TooltipProvider>
            <div>
            { userType === "PROF" && 
                <div className="flex items-center pb-4">
                    <TooltipProvider>
                    <Tooltip delayDuration={50}>
                        <TooltipTrigger asChild>
                        <Button variant='ghost' className="hover:bg-gray-300 dark:hover:bg-neutral-700 hover:cursor-pointer" onClick={() => {router.push('/posts/new_post')}}>
                        <PencilLine className="pt-2 h-9 w-9" />
                        </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>Make new Post</p>
                        </TooltipContent>
                    </Tooltip>
                    </TooltipProvider>
                </div> 
            }
            <div className="flex items-center justify-center pb-5">
                <TooltipProvider>
                    <Tooltip delayDuration={50}>
                        <TooltipTrigger asChild>
                            <Button variant='ghost' className="hover:bg-gray-300 dark:hover:bg-neutral-700 hover:cursor-pointer" onClick={() => {router.push('/')}}>
                            <DoorOpen className="pt-2 h-9 w-9" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>Exit to Landing Page</p>
                        </TooltipContent>
                    </Tooltip>
                    </TooltipProvider>
            </div>
            <div className="flex items-center justify-center pb-5">
                <TooltipProvider>
                    <Tooltip delayDuration={50}>
                        <TooltipTrigger asChild>
                        <Button variant='ghost' className="hover:bg-gray-300 dark:hover:bg-neutral-700 hover:cursor-pointer" onClick={resume.onOpen}>
                            <FilePlus className="pt-2 h-9 w-9" />
                        </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>Upload Resume</p>
                        </TooltipContent>
                    </Tooltip>
                    </TooltipProvider>
            </div>
                {userData?.userType === "STUDENT" &&
                <div className="flex items-center justify-center pb-5">
                    <TooltipProvider delayDuration={50}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                            <Button variant='ghost' className="hover:bg-gray-300 dark:hover:bg-neutral-700 hover:cursor-pointer" onClick={() => {router.push(`/profiles/${userData?.userId}`)}}>
                                <NotepadText className="pt-2 h-9 w-9" />
                            </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>Edit Cover Letter on Profile</p>
                            </TooltipContent>
                        </Tooltip>
                        </TooltipProvider>
                </div>
                }
            </div>
            
            <div className="flex flex-col items-center justify-center">
                    <TooltipProvider>
                        <Tooltip delayDuration={50}>
                            <TooltipTrigger asChild>
                            <Button variant='ghost' className="hover:bg-gray-300 dark:hover:bg-neutral-700 hover:cursor-pointer" onClick={() => {router.push(`/profiles/${userData?.userId}`)}}>
                                <UserRound className="h-7 w-7" />
                            </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>View/Edit Profile</p>
                            </TooltipContent>
                        </Tooltip>
                        </TooltipProvider>
            <div className="pt-5 pb-8">
                    <TooltipProvider>
                        <Tooltip delayDuration={50}>
                            <TooltipTrigger asChild>
                            <Button variant="ghost" onClick={() => signOut()} className="hover:bg-gray-300 dark:hover:bg-neutral-700 hover:cursor-pointer">
                                <LogOut className="h-7 w-7" />
                            </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>Log Out</p>
                            </TooltipContent>
                        </Tooltip>
                        </TooltipProvider>  
            </div>
            </div>

        </div>
        </div>
    );
};

export default Sidebar;
