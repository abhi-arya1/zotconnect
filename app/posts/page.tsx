"use client";

import { ModeToggle } from "@/components/mode_toggle";
import { FilePlus, PencilLine, Plug, PlusSquare, SquarePen, Unplug } from "lucide-react";
import Sidebar from "../../components/sidebar";
  

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import PostsList from "@/components/post";
import { useResume } from "@/hooks/use-file-upload";

interface IPost {
    title: string;
    contents: string;
    name: string; // Name of the user who posted
    email: string;
    targetMajors: string[];
    targetSkills: string[];
    targetYears: string[];
}
  

const PostsPage = () => {
    const router = useRouter()
    const [posts, setPosts] = useState<IPost[]>([]);
    const resume = useResume();

    const{user} = useUser();
    const userData = useQuery(api.user.getByUserId, {
        userId: user?.id || "Error"
    });

    const validPosts = useQuery(api.userpost.getPostsByUser, {
        userId: user?.id || "Error"
    })

    useEffect(() => {
        if(validPosts){
            setPosts(validPosts);
        }
    }, [validPosts]);


    return (
    <div className="flex flex-row w-screen items-center justify-center">
        <Sidebar />

        <div className="fixed top-0 right-0 p-4">
            <ModeToggle />
        </div>

        <div className="fixed bottom-0 right-0 p-20">
            <DropdownMenu>
            <DropdownMenuTrigger>
                <div role="button" className={`bg-gray-200 hover:bg-gray-300 dark:bg-gray-950 dark:hover:bg-black rounded-lg p-4 transition-colors duration-300 ease-in-out`}>
                    <PlusSquare className="h-10 w-10"/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                { userData?.userType === "PROF" && 
                    <DropdownMenuItem className="hover:cursor-pointer" onClick={() => {router.push('/posts/new_post')}}>
                        <div className="pr-2">
                            <SquarePen className="h-4 w-4" />
                        </div>
                        New Post
                    </DropdownMenuItem>
                }
                <DropdownMenuItem className="hover:cursor-pointer" onClick={resume.onOpen}>
                    <div className="pr-2">
                        <FilePlus className="h-4 w-4" />
                    </div>
                    Add Resume
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:cursor-pointer" onClick={() => {router.push(`/profiles/${user?.id}`)}}>
                    <div className="pr-2">
                        <PencilLine className="h-4 w-4" />
                    </div>
                    Add Cover Letter
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <div className="flex flex-col items-center justify-center w-2/3 pt-40 pb-40">
            <div className="flex flex-row justify-center"><h1 className="pr-5 text-6xl font-bold pb-20">Connections <span className="dark:text-customLightBlue text-customDarkBlue">Curated</span> For You</h1><Unplug className="h-14 w-14"/> </div>
            { validPosts !== undefined ? (
                <PostsList posts={validPosts} />
            ) : (
                <div>
                    No Applicable Positions Found, Check Back Later!
                </div>
            )}
        </div>
        
    </div> 
    );
}
 
export default PostsPage;