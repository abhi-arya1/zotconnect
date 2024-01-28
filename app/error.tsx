"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const Error = () => {
    return ( 
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <h2 className="text-xl font-semibold">
                Oh No! Something Went Wrong!
            </h2>
            <Link href="/posts">
                <Button asChild className="bg-green-600 hover:bg-green-700">
                    Return to Safety
                </Button>
            </Link>
        </div>
     );
}
 
export default Error;