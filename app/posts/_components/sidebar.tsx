import React, { useState } from 'react';
import Image from 'next/image';
import { Home, Cog, Pencil, SidebarClose } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/clerk-react';

const Sidebar: React.FC = () => {
    const router = useRouter();
    const { user } = useUser();

    return (
        <div className="fixed left-0 top-0">
        <div className="flex flex-col items-center justify-between h-screen w-20 p-15 bg-gray-300 dark:bg-neutral-700 rounded-r-3xl shadow-xl" 
        >
            <Button variant='ghost' className="hover:bg-gray-300 dark:hover:bg-neutral-700 hover:cursor-pointer" onClick={() => {router.push('/posts')}}>
                <Image 
                    src="/petrhead.png"
                    alt="Logo"
                    width={50}
                    height={40}
                    style={{ borderRadius: '10px', cursor: 'pointer' }}
                    className="drop-shadow-2xl pt-8"
                />
            </Button>
            <div className="flex items-center justify-center">
                <Button variant='ghost' className="hover:bg-gray-300 dark:hover:bg-neutral-700 hover:cursor-pointer" onClick={() => {router.push('/')}}>
                    <SidebarClose className="pt-2" />
                </Button>
            </div>
            <div className="flex items-center">
                <Button variant='ghost' className="hover:bg-gray-300 dark:hover:bg-neutral-700 hover:cursor-pointer" onClick={() => {router.push('/new_post')}}>
                    <Pencil className="pt-2" />
                </Button>
            </div>
            <div className="pb-8">
                <UserButton />
                {/* {user?.fullName} */}
            </div>
        </div>
        </div>
    );
};

export default Sidebar;
