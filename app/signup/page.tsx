"use client";

import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { TextareaForm } from "./_components/bio_form";
import * as z from "zod"
import { toast } from "@/components/ui/use-toast";
import { InputWithButton } from "./_components/signup_input";
import { ModeToggle } from "@/components/mode_toggle";
import { CheckCircle, XCircle } from "lucide-react";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { redirect, useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";
import { ConfirmModal } from "@/components/modals/confirm_modal";

const STUDENT = "STUDENT"
const PROF = "PROF"

const FormSchema = z.object({
    bio: z
      .string()
      .min(10, {
        message: "Bio must be at least 10 characters.",
      })
      .max(160, {
        message: "Bio must not be longer than 160 characters.",
      }),
  })

const SignupPages = () => {
    const createStudent = useMutation(api.user.createStudent)
    const createProf = useMutation(api.user.createProf)
    const router = useRouter()

    // USER DATA
    const { user } = useUser(); 
    const userId = user?.id;
    const [userType, setUserType] = useState("");
    const [bio, setBio] = useState("");
    const [majorInterest, setMajorInterest] = useState("")
    const [url, setUrl] = useState("")
    const [year, setYear] = useState("2024");
    const [studentSkills, setStudentSkills] = useState<string[]>([]);

    // PAGE STATES 
    const [studentButtonDisable, setStudentButtonDisable] = useState(false)
    const [profButtonDisable, setProfButtonDisable] = useState(false)
    const { isAuthenticated, isLoading } = useConvexAuth();

    if(isLoading && !isAuthenticated) {
        return (
        <div className="h-full flex items-center justify-center">
            <Spinner size="lg"/>
        </div>
        )
    }

    if(!isLoading && !isAuthenticated) {
        return redirect("/"); 
    }

    const onCreate = () => {
        if (!userId) return;
        if (userType === STUDENT) {
            createStudent({ 
                bio: bio,
                userId: userId,
                userType: userType,
                name: user?.fullName || "Error",
                year: year,
                major: majorInterest,
                url: url,
                skills: studentSkills,
            })
            .then(() => {
                router.push('/posts');
            })
        } else {
            createProf({
                bio: bio,
                name: user?.fullName || "Error",
                userId: userId,
                major: majorInterest,
                userType: userType,
                url: url,
            })
            .then(() => {
                router.push('/posts');
            })
        }

        toast({
            title: "Success! Welcome to ZotConnect"
        })
    }

    const selectedStudent = () => {
        setUserType(STUDENT)
        setStudentButtonDisable(false);
        setProfButtonDisable(true)
    }

    const selectedProf = () => {
        setUserType(PROF)
        setProfButtonDisable(false);
        setStudentButtonDisable(true);
    }

    const handleBioFormSubmit = (formData: z.infer<typeof FormSchema>) => {
        toast({
            title: "Saved Bio!"
          })
       setBio(formData.bio)
    };

    const handleMajorInterestSubmit = (value: string) => {
        toast({
            title: `Saved as ${value}!`
          })
        setMajorInterest(value)
    };

    const handleURLSubmit = (value: string) => {
        toast({
            title: `Saved URL: ${value}`
        })
        setUrl(value);
    }

    const handleYearSubmit = (value: string) => {
        toast({
            title: `Set Graduation Year: ${value}`
        })
        setYear(value);
    }

    const addSkill = (item: string) => {
        if (studentSkills.indexOf(item) < 0) {
            setStudentSkills(oldList => [...oldList, item]);
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setStudentSkills(studentSkills.filter(skill => skill !== skillToRemove));
      };
    
    return ( 
    <div className="h-full flex flex-col relative">
        
        <div className="relative flex flex-col justify-center items-center">
            <div className="pt-36 text-shadow font-bold text-3xl relative z-10">
                Welcome to ZotConnect, <span className="text-[#2563eb] dark:text-[#0390fc]">{user?.fullName}</span>!
                <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-[600px] h-20 bg-gradient-to-r from-customDarkBlue to-customLightBlue blur-3xl rounded-full z-[-50]"></div>
            </div>

            {/* BASIC INFORMATION */}
            <div className="flex flex-row pt-10">
                <Button variant={studentButtonDisable ? "ghost" : "default"} className={studentButtonDisable ? "shadow-2xl text-muted-foreground hover:bg-inherit hover:text-muted-foreground" : ""} onClick={studentButtonDisable ? () => {} : selectedStudent}>
                    Student
                </Button>
                <div className="pl-2 pb-5">
                <Button variant={profButtonDisable ? "ghost" : "default"} className={profButtonDisable ? "shadow-2xl text-muted-foreground hover:bg-inherit hover:text-muted-foreground" : ""} onClick={profButtonDisable ? () => {} : selectedProf}>
                    Professor
                </Button>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <TextareaForm onFormSubmit={handleBioFormSubmit}/>
            </div>
            <div className="pt-10">
                {userType === STUDENT ? (
                    <div>
                        <InputWithButton
                            onInputSubmit={handleMajorInterestSubmit}
                            placeholder="Major (Full Form, NO Abbreviations)"
                            buttonName="Save"
                            onAddToList={(value: string) => {}}
                        />
                        <InputWithButton
                            onInputSubmit={handleYearSubmit}
                            placeholder="Expected Graduation Year (Number Only)"
                            buttonName="Save"
                            onAddToList={(value: string) => {}}
                        />
                        <InputWithButton
                            onInputSubmit={handleURLSubmit}
                            placeholder="Add URL (e.g. LinkedIn, Research Site, etc)"
                            buttonName="Save"
                            onAddToList={(value: string) => {}}
                        />
                        <InputWithButton 
                            onInputSubmit={addSkill}
                            placeholder="Add Skills (Coding Languages, Research, etc)"
                            buttonName="Add"
                            clearInputOnAdd={true}
                            onAddToList={addSkill}
                        />
                        <div>
                            {studentSkills.length !== 0 ? (
                                <div className="flex flex-wrap max-w-[400px] text-gray-200 dark:text-muted-foreground items-center justify-center pt-4">
                                    {studentSkills.map(skill => (
                                        <button key={skill} onClick={() => removeSkill(skill)} className="flex flex-row m-1 items-center bg-slate-600 p-2 pl-3 pr-3 rounded-lg">
                                        {skill} <XCircle className="pl-1 h-5 w-5" />
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col text-muted-foreground items-center justify-center pt-4">
                                    <i>Add Skills</i>
                                </div>
                            )}
                        </div>
                    </div>
                ) : userType === PROF ? (
                    <div>
                        <InputWithButton
                            onInputSubmit={handleMajorInterestSubmit}
                            placeholder="Research Interest or Field"
                            buttonName="Save"
                            onAddToList={(value: string) => {}}
                        />
                        <InputWithButton
                            onInputSubmit={handleURLSubmit}
                            placeholder="Add URL (e.g. LinkedIn, Research Site, etc)"
                            buttonName="Save"
                            onAddToList={(value: string) => {}}
                        />
                    </div>
                ) : (
                    <div>Please Select A Role, either <span className="text-[#2563eb] dark:text-[#0390fc]">Student</span> or <span className="text-[#2563eb] dark:text-[#0390fc]">Professor</span></div>
                )}
            </div>
            
            {userType && bio && url &&
                <div className="pt-20">
                    <ConfirmModal
                        onConfirm={onCreate}
                        title="Wait a minute..."
                        description="Are you sure the information provided is accurate?"
                    >
                        <Button className="p-7 text-lg">
                            Submit <CheckCircle className="pl-2" />
                        </Button>
                    </ConfirmModal>
                </div>
            }

            {/* <div className="relative bottom-0 left-1/2 transform -translate-x-1/2 w-full h-20 bg-gradient-to-t from-customDarkBlue to-customLightBlue blur-xl z-[-1]"></div> */}
        </div>
        <div className="fixed top-0 right-0 p-4">
            <ModeToggle />
        </div>
    </div>
    );
}
 
export default SignupPages;