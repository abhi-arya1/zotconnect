"use client";

import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { TextareaForm } from "./_components/bio_form";
import * as z from "zod"
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
    bio: z
      .string()
      .min(10, {
        message: "Bio must be at least 10 characters.",
      })
      .max(160, {
        message: "Bio must not be longer than 30 characters.",
      }),
  })

const SignupPages = () => {
    const [userType, setUserType] = useState('STUDENT')
    const [studentButtonDisable, setStudentButtonDisable] = useState(false)
    const [profButtonDisable, setProfButtonDisable] = useState(false)
    const [bio, setBio] = useState("")
    const { user } = useUser(); 

    const selectedStudent = () => {
        setUserType("STUDENT")
        setStudentButtonDisable(false);
        setProfButtonDisable(true)
    }

    const selectedProf = () => {
        setUserType("PROF")
        setProfButtonDisable(false);
        setStudentButtonDisable(true)
    }

    const handleFormSubmit = (formData: z.infer<typeof FormSchema>) => {
        toast({
            title: "Saved Bio!"
          })
       setBio(formData.bio)
    };

    return ( 
    <div className="h-full flex flex-col">
        <div className="flex flex-col justify-center items-center">
            <div className="pt-40 font-bold text-3xl">
                Welcome to ZotConnect, <span className="text-[#03fcf8]">{user?.fullName}</span>!
            </div>
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
            <div>
                <TextareaForm onFormSubmit={handleFormSubmit}/>
            </div>
        </div>
    </div> 
    );
}
 
export default SignupPages;