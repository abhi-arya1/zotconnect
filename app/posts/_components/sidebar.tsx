import React from 'react';
import Image from 'next/image';
import { Home, Cog } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';

const Sidebar: React.FC = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-between h-screen p-2 transition-all duration-500 ease-in-out hover:w-48 bg-gray-100 dark:bg-gray-900 w-12 rounded-r-3xl shadow-xl">
            <Button variant='ghost' onClick={() => {router.push('/')}}>
                    <Image 
                        src="/petrhead.png"
                        alt="Logo"
                        width={30}
                        height={30}
                        style={{ borderRadius: '10px', cursor: 'pointer' }}
                        className="drop-shadow-2xl"
                    />
            </Button>
            <Button variant='ghost' onClick={() => {router.push('/')}}>
                <Home className="h-7 w-7" />
            </Button>
        </div>
    );
};

export default Sidebar;
