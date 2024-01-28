"use client";
import { Spinner } from "@/components/spinner";
import { Toaster } from "@/components/ui/toaster";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useConvexAuth, useQuery } from "convex/react";
import { redirect } from "next/navigation";

const PostsLayout = ({
    children
}: {
    children: React.ReactNode; 
}) => {
    const { isAuthenticated, isLoading } = useConvexAuth(); 
    const{user} = useUser();
    const userData = useQuery(api.user.getByUserId, {
        userId: user?.id || "Error"
    });

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center dark:bg-[#121212]">
                <Spinner size="lg"/>
            </div>
        )
    }

    if (!isAuthenticated) {
        return redirect("/"); 
    }

    if (userData?.userType === "STUDENT") {
        return redirect("/posts")
    }

    return ( 
        <div className="h-full flex dark:bg-[#121212]">
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
            <Toaster />
        </div>
    );
}
 
export default PostsLayout;