import React, { useState } from 'react';
import Image from 'next/image';
import { Home, Cog, Pencil, SidebarClose } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/clerk-react';

const Sidebar: React.FC = () => {
    const router = useRouter();
    const { user } = useUser();
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="flex flex-col items-center justify-between h-screen w-20 p-15 transition-all duration-500 ease-in-out bg-gray-300 hover:w-52 dark:bg-neutral-700 rounded-r-3xl shadow-xl" 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
            <div className={`flex flex-col items-start transition-transform duration-700 transform ${isHovered ? 'translate-x-[-20%]' : 'translate-x-0'}`}>
                <div className="flex items-center">
                    <SidebarClose className="pt-2 h-[70px]" />
                    {isHovered && <span className='ml-6 font-bold'>Close</span>}
                </div>
                <div className="flex items-center">
                    <Pencil className="pt-2 h-[70px]" />
                    {isHovered && <span className='ml-6 font-bold'>Edit</span>}
                </div>
            </div>
            <div className="pb-8">
                <UserButton />
                {/* {user?.fullName} */}
            </div>
        </div>
    );
};

export default Sidebar;
