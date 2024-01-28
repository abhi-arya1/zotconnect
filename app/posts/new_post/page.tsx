"use client";

import { useUser } from "@clerk/clerk-react";
import { TextareaForm } from "./_components/post_info";
import { toast } from "@/components/ui/use-toast";
import { InputWithButton } from "./_components/post_input";
import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm_modal";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

const NewPostPage = () => {
	const { user } = useUser();
    const userData = useQuery(api.user.getByUserId, {
        userId: user?.id || "Error"
    });
	const router = useRouter()


	const createPost = useMutation(api.userpost.createPost);

	const [desc, setDesc] = useState("");
	const [title, setTitle] = useState("");
	const [majors, setMajors] = useState<string[]>([]);
	const [studentSkills, setStudentSkills] = useState<string[]>([]);
	const [years, setYears] = useState<string[]>([]);

	const handleSubmit = () => {
		const email = user?.primaryEmailAddress?.emailAddress;
		const pfpUrl = user?.imageUrl
		createPost({
			userId: user?.id || "Err",
			title: title,
			contents: desc,
			email: email || "Err",
			pfpUrl: pfpUrl || "Err",
			targetMajors: majors,
			targetSkills: studentSkills,
			targetYears: years,
			name: user?.fullName || "Err"
		})
		.then(() => {
			router.push('/posts');
		})

		toast({
			title: "Posted!"
		})
	}

	const addMajor = (item: string) => {
        if (majors.indexOf(item) < 0) {
            setMajors(oldList => [...oldList, item]);
        }
    };

    const removeMajor = (majToRemove: string) => {
        setMajors(majors.filter(major => major !== majToRemove));
      };

	const addSkill = (item: string) => {
        if (studentSkills.indexOf(item) < 0) {
            setStudentSkills(oldList => [...oldList, item]);
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setStudentSkills(studentSkills.filter(skill => skill !== skillToRemove));
      };

	const addYear = (item: string) => {
	if (years.indexOf(item) < 0) {
		setYears(oldList => [...oldList, item]);
	}
    };

    const removeYear = (yearToRem: string) => {
        setYears(years.filter(year => year !== yearToRem));
      };


	return (
	<div className="h-full flex flex-col relative">
		<div className="relative flex flex-col justify-center items-center">
			<div className="pt-36 text-shadow font-bold text-3xl relative z-10" >
				Let&apos;s find your ideal hire, <span className="text-[#2563eb] dark:text-[#0390fc]">Professor {user?.lastName}</span>!
				<div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-[600px] h-8 bg-gradient-to-r from-customDarkBlue to-customLightBlue blur-2xl rounded-full z-[-50]"></div>
			</div>
			<div className="pt-20"></div>
			<InputWithButton 
				onInputSubmit={(value) => {setTitle(value)}}
				onAddToList={(value) => {}}
				buttonName="Save"
				placeholder="Job Title"
				clearInputOnAdd={false}
			/>

			<TextareaForm onFormSubmit={(value) => {
				setDesc(value.bio);
				toast({
					title: "Saved Job Description"
				})}} 
			/>
			</div>

			<div className="flex flex-col items-center justify-center pt-10 pb-10">
				<InputWithButton  
					onInputSubmit={(value) => {}}
					onAddToList={(value) => addMajor(value)}
					buttonName="Add"
					placeholder="Recommended Majors (NO Abbrev.)"
					clearInputOnAdd={true}
				/>
				{majors.length !== 0 ? (
					<div className="flex flex-wrap max-w-[400px] text-gray-200 dark:text-muted-foreground items-center justify-center pt-2">
						{majors.map(major => (
							<button key={major} onClick={() => removeMajor(major)} className="flex flex-row m-1 items-center bg-slate-600 p-2 pl-3 pr-3 rounded-lg">
							{major} <XCircle className="pl-1 h-5 w-5" />
							</button>
						))}
					</div>
				) : (
					<div className="flex flex-col text-muted-foreground items-center justify-center pt-2">
						<i>Add Majors</i>
					</div>
				)}
				<div className="pt-10"></div>
				<InputWithButton  
					onInputSubmit={(value) => {}}
					onAddToList={(value) => {addSkill(value)}}
					buttonName="Add"
					placeholder="Recommended Skills"
					clearInputOnAdd={true}
				/>
				{studentSkills.length !== 0 ? (
					<div className="flex flex-wrap max-w-[400px] text-gray-200 dark:text-muted-foreground items-center justify-center pt-2">
						{studentSkills.map(skill => (
							<button key={skill} onClick={() => removeSkill(skill)} className="flex flex-row m-1 items-center bg-slate-600 p-2 pl-3 pr-3 rounded-lg">
							{skill} <XCircle className="pl-1 h-5 w-5" />
							</button>
						))}
					</div>
				) : (
					<div className="flex flex-col text-muted-foreground items-center justify-center pt-2">
						<i>Add Skills</i>
					</div>
				)}
				<div className="pt-10"></div>
				<InputWithButton  
					onInputSubmit={(value) => {}}
					onAddToList={(value) => {addYear(value)}}
					buttonName="Add"
					placeholder="Recommended Grad. Years"
					clearInputOnAdd={true}
				/>
				{years.length !== 0 ? (
					<div className="flex flex-wrap max-w-[400px] text-gray-200 dark:text-muted-foreground items-center justify-center pt-2">
						{years.map(year => (
							<button key={year} onClick={() => removeYear(year)} className="flex flex-row m-1 items-center bg-slate-600 p-2 pl-3 pr-3 rounded-lg">
							{year} <XCircle className="pl-1 h-5 w-5" />
							</button>
						))}
					</div>
				) : (
					<div className="flex flex-col text-muted-foreground items-center justify-center pt-2">
						<i>Add Graduation Years (e.g. 2024, 2025, etc.)</i>
					</div>
				)}
			</div>


			{ majors.length !== 0 && years.length !== 0 && studentSkills.length !== 0 && title && desc &&
				<div className="flex items-center justify-center pt-10 pb-20">
                    <ConfirmModal
                        onConfirm={handleSubmit}
                        title="Confirm Post"
                        description="Are you sure you want to make this Job Post?"
                    >
                        <Button className="p-7 text-lg">
                            Submit <CheckCircle className="pl-2" />
                        </Button>
                    </ConfirmModal>
                </div>
			}

	</div>
	)
}

export default NewPostPage;