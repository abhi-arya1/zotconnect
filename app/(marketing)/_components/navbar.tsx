"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode_toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton, SignUpButton } from "@clerk/clerk-react";
import Image from "next/image";


export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()
    const scrolled = useScrollTop()

    return (
        <div className={cn(
            "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
            scrolled && "border-b shadow-sm"
        )}>
            <Link href="/signup">
                <Image 
                    src="/zotconnect.jpg" // Your image path
                    alt="Logo"
                    width={50} // Adjust as needed
                    height={50} // Adjust as needed
                    style={{ borderRadius: '10px', cursor: 'pointer' }} // Rounded edges and cursor style
                />
            </Link>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && (
                    <div>Loading...</div>
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm">
                                Log In
                            </Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button size="sm">
                                Join ZotConnect
                            </Button>
                        </SignUpButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                    <Button size="sm" asChild>
                        <Link href="/posts">
                            Enter ZotConnect
                        </Link>
                    </Button>
                    <UserButton afterSignOutUrl="/" />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    )
}