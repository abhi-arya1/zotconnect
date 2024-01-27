"use client";

import { ModeToggle } from "@/components/mode_toggle";
import { FilePlus, PencilLine, PlusSquare, SquarePen } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
  

const PostsPage = () => {
    const router = useRouter()

    return (
    <div>
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
            <DropdownMenuItem className="hover:cursor-pointer" onClick={() => {router.push('/new_post')}}>
                <div className="pr-2">
                    <SquarePen className="h-4 w-4" />
                </div>
                New Post
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:cursor-pointer" onClick={() => {router.push('/new_resume')}}>
                <div className="pr-2">
                    <FilePlus className="h-4 w-4" />
                </div>
                Add Resume
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:cursor-pointer" onClick={() => {router.push('/new_cover_letter')}}>
                <div className="pr-2">
                    <PencilLine className="h-4 w-4" />
                </div>
                Add Cover Letter
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
        </div>
        Hello World
    </div> 
    );
}
 
export default PostsPage;