"use client";

import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { TextareaForm } from "./_components/bio_form";
import * as z from "zod"
import { toast } from "@/components/ui/use-toast";
import { InputWithButton } from "./_components/signup_input";
import { ModeToggle } from "@/components/mode_toggle";

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
    // USER DATA
    const { user } = useUser(); 
    const userId = user?.id;
    const [userType, setUserType] = useState("");
    const [bio, setBio] = useState("");
    const [majorInterest, setMajorInterest] = useState("")
    const [url, setUrl] = useState("")

    // PAGE STATES 
    const [studentButtonDisable, setStudentButtonDisable] = useState(false)
    const [profButtonDisable, setProfButtonDisable] = useState(false)

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

    const handleBioFormSubmit = (formData: z.infer<typeof FormSchema>) => {
        toast({
            title: "Saved Bio!"
          })
       setBio(formData.bio)
    };

    const handleMajorInterestSubmit = (type: string, value: string) => {
        toast({
            title: `Saved ${type} as ${value}!`
          })
        setMajorInterest(value)
    };

    return ( 
    <div className="h-full flex flex-col">
        <div className="fixed absolute top-0 right-0 p-4">
            <ModeToggle />
        </div>
        
        <div className="flex flex-col justify-center items-center">
            <div className="pt-40 font-bold text-3xl">
                Welcome to ZotConnect, <span className="text-[#2563eb] dark:text-[#0390fc]">{user?.fullName}</span>!
            </div>

            {/* BASIC INFORMATION */}
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
            <div className="flex flex-col justify-center items-center">
                <TextareaForm onFormSubmit={handleBioFormSubmit}/>
            </div>
            <div className="pt-10">
                {userType === "STUDENT" ? (
                    <div>
                        <InputWithButton
                            onInputSubmit={handleMajorInterestSubmit}
                            placeholder="Major (No Abbreviations)"
                        />
                        <InputWithButton
                            onInputSubmit={handleMajorInterestSubmit}
                            placeholder="URL (LinkedIn, etc)"
                        />
                    </div>
                ) : userType === "PROF" ? (
                    <div>
                        <InputWithButton
                            onInputSubmit={handleMajorInterestSubmit}
                            placeholder="Research Interest or Field"
                        />
                        <InputWithButton
                            onInputSubmit={handleMajorInterestSubmit}
                            placeholder="URL (LinkedIn, etc)"
                        />
                    </div>
                ) : (
                    <div>Please Select A Role, either <span className="text-[#2563eb] dark:text-[#0390fc]">Student</span> or <span className="text-[#2563eb] dark:text-[#0390fc]">Professor</span></div>
                )}
            </div>


        </div>
    </div> 
    );
}
 
export default SignupPages;