"use client";

import { useState } from "react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";


const SignupPages = () => {
    const [userType, setUserType] = useState('STUDENT')
    const [studentButtonDisable, setStudentButtonDisable] = useState(false)
    const [profButtonDisable, setProfButtonDisable] = useState(false)
    const { user } = useUser(); 

    const selectedStudent = () => {
        setUserType("STUDENT")
        setProfButtonDisable(true)
        console.log("STUDENT")
    }

    const selectedProf = () => {
        setUserType("PROF")
        setStudentButtonDisable(true)
        console.log("PROF")
    }

    return ( 
    <div className="h-full flex flex-col">
        <div className="flex flex-col justify-center items-center">
            Welcome {user?.fullName}
            <div className="flex flex-col pt-10">
                <Button variant={studentButtonDisable ? "ghost" : "default"} onClick={selectedStudent}>
                    Student
                </Button>
                <div className="pt-2">
                <Button variant={profButtonDisable ? "ghost" : "default"} onClick={selectedProf}>
                    Professor
                </Button>
                </div>
            </div>
        </div>
    </div> 
    );
}
 
export default SignupPages;