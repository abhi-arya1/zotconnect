"use client";

import { useUser } from "@clerk/clerk-react";
import { TextareaForm } from "./_components/post_info";
import { toast } from "@/components/ui/use-toast";

const NewPostPage = () => {
	const { user } = useUser();

	return (
	<div className="h-full flex flex-col relative">
		<div className="relative flex flex-col justify-center items-center">
			<div className="pt-36 text-shadow font-bold text-3xl relative z-10">
				Let&apos;s find your ideal hire, <span className="text-[#2563eb] dark:text-[#0390fc]">Professor {user?.lastName}</span>!
				<div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-[600px] h-16 bg-gradient-to-r from-customDarkBlue to-customLightBlue blur-3xl rounded-full z-[-50]"></div>
			</div>

			<TextareaForm onFormSubmit={() => {toast({
        title: "Saved Job Description"
    })}} />

		</div>
	</div>
	)
}

export default NewPostPage;