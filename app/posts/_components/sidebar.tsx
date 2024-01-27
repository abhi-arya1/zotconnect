import React from 'react';
import Image from 'next/image';
import { Home, Cog, Pencil, SidebarClose } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/clerk-react';

const Sidebar: React.FC = () => {
    const router = useRouter();
    const { user } = useUser();
    return (
        <div className="flex flex-col items-center justify-between h-screen w-20 p-15 transition-all duration-500 ease-in-out bg-gray-300 hover:w-52 bg-gray-100 dark:bg-neutral-700 rounded-r-3xl shadow-xl">
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
            <div className="flex flex-col">
                <SidebarClose className="" />
                <Pencil className="pt-2" />
            </div>
            <div className="pb-8">
                <UserButton />
                {/* {user?.fullName} */}
            </div>
        </div>
    );
};

export default Sidebar;
