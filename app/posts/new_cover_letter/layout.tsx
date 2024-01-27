"use client";
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

const PostsLayout = ({
    children
}: {
    children: React.ReactNode; 
}) => {
    const { isAuthenticated, isLoading } = useConvexAuth(); 

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center dark:bg-[#1F1F1F]">
                <Spinner size="lg"/>
            </div>
        )
    }

    if (!isAuthenticated) {
        return redirect("/"); 
    }

    return ( 
        <div className="h-full flex dark:bg-[#1F1F1F]">
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
 
export default PostsLayout;