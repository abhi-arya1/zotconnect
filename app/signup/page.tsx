"use client";

import { useState } from "react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";


const SignupPages = () => {
    const [userType, setUserType] = useState('STUDENT')
    const { user } = useUser(); 

    const selectedStudent = () => {
        setUserType("STUDENT")
        console.log("STUDENT")
    }

    return ( 
    <div className="h-full flex flex-col">
        <div className="flex flex-col justify-center items-center">
            Welcome {user?.fullName}
            <div className="flex flex-col pt-10">
                <Button>
                    Student
                </Button>
                <div className="pt-2">
                <Button className="" onClick={selectedStudent}>
                    Professor
                </Button>
                </div>
            </div>
        </div>
    </div> 
    );
}
 
export default SignupPages;