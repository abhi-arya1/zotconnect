"use client";

import { ModeToggle } from "@/components/mode_toggle";
import Sidebar from "@/components/sidebar";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogDescription, AlertDialogTitle, AlertDialogCancel, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { Sparkles } from "lucide-react";
import { useParams } from "next/navigation";
import { chatWithCoverLetterModel, chatWithResumeModel } from "@/lib/chat";
import { CoverLetterForm } from "./_components/add_cover_letter";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import * as z from "zod"
import { Spinner } from "@/components/spinner";
import MarkdownContent from "@/components/render_markdown";
import { ResumeForm } from "./_components/add_resume";
import PostsList from "@/components/post";

const STUDENT = "STUDENT"
const PROF = "PROF"

const FormSchema = z.object({
    post: z
      .string()
      .min(30, {
        message: "Cover Letters must be at least 30 characters.",
      })
      .max(10000000, {
        message: "Cover Letters must not be longer than 10000000 characters.",
      }),
  })
  

const ProfilePage = () => {
    const { user } = useUser();
    const addCoverLetter = useMutation(api.user.addCoverLetter);
    const params = useParams<{userId: string}>();
    const userData = useQuery(api.user.getByUserId, {
        userId: params.userId || "Error"
    });

    const posts = useQuery(api.userpost.getPostsMadeBy, {
        userId: userData?.userId || "Err"
    })

    const isYourPage = user?.id === params.userId
    const userType = userData?.userType
    const userUrl = userData?.url;
    const formattedUserUrl = userUrl && !userUrl.startsWith('http://') && !userUrl.startsWith('https://')
        ? `https://${userUrl}`
        : userUrl;

    const [resumeText, setResumeText] = useState("");
    const [review, setReview] = useState("");
    const [CLloading, setCLLoading] = useState(false);

    const onCLSubmit = (formData: z.infer<typeof FormSchema>) => {
        if (!isYourPage) return;
        addCoverLetter({
            userId: user?.id,
            coverLetter: formData.post
        });
        toast({
            title: "Saved Cover Letter!"
        })
    }


    const reviewCLWithAI = async () => {
        toast({
            title: "Google Gemini is loading a Cover Letter Review"
        })

        if(!userData?.cover_letter) {
            toast({
                title: "Please Add a Cover Letter!"
            })
            return;
        }

        try {
            setCLLoading(true);
            const response = await chatWithCoverLetterModel(`Please use STRICT Markdown Syntax and English Only, and provide a title of "Detailed Cover Letter Review" as bolded text and then numbered bullet points for each section, with new lines in MARKDOWN SYNTAX in between each section. Please provide a detailed review of the following cover letter. Please include SPECIFIC DETAILED FEEDBACK including Strengths and Weaknesses that directly applies to this letter and this letter alone. Please bold all section headers in Markdown. If you are making a suggestion, provide context and where it is in the text: ${userData?.cover_letter}`);
            setReview(response.text()); // Assuming response has a text method
            setCLLoading(false);
            } catch (error) {
            console.error('Error fetching chat response:', error);
            setReview('Error fetching response');
            }
        };

    const reviewResumeWithAI = async () => {
        toast({
            title: "Google Gemini is loading a Resume Review"
        })

        if(!userData?.resume_url) {
            toast({
                title: "Please add a Resume to your Profile"
            })
            return;
        }

        try {
            setCLLoading(true);
            const response = await chatWithResumeModel(`Please use STRICT Markdown Syntax and English Only, and provide a title of "Detailed Resume Review" as bolded text and then numbered bullet points for each section, with new lines in MARKDOWN SYNTAX in between each section. Please provide a detailed review of the following Resume. Do NOT provide feedback on Formatting. Please include SPECIFIC DETAILED FEEDBACK that follows Modern Job Resume Trends and directly and exactly applies to this letter and this letter alone. If you are making a suggestion, provide context and where it is in the text: ${resumeText}`);
            setReview(response.text()); // Assuming response has a text method
            setCLLoading(false);
            } catch (error) {
            console.error('Error fetching chat response:', error);
            setReview('Error fetching response');
            }
        };
    

    return ( 
        <div className="flex">
            <Sidebar />
            <div className="fixed top-0 p-4 right-0"><ModeToggle /></div>
        <div className="flex flex-row">
            <div className="flex flex-col items-left justify-left pl-48 pt-20 max-w-[750px]">
                <div className="bg-gray-300 dark:bg-neutral-700 p-6 pr-7 flex flex-row w-30 h-30 items-center justify-between rounded-3xl">
                    <div className="flex flex-col">
                        {isYourPage && <span className="pb-3">Welcome, </span>}
                        <div className="flex flex-row gap-x-2">
                            {isYourPage && <UserButton />}
                            <span className="font-bold text-3xl pb-2">{userData?.name}</span>
                        </div>
                        {userType === PROF ? (
                            <i className="text-muted-foreground">Research Focus: {userData?.major}</i>
                        ) : (
                            <i className="text-muted-foreground">{userData?.major}, Class of {userData?.year}</i>
                        )}
                        <a href={formattedUserUrl} target="_blank" className="underline pt-2 text-customDarkBlue dark:text-customLightBlue">{userData?.url}</a>
                    </div>
                </div>
                <div className="pt-5"></div>
                { userData?.resume_url && (isYourPage || userType === "PROF") && (
                <div className="flex flex-row gap-x-3">
                    <div>
                    <AlertDialog>
                    <AlertDialogTrigger asChild>
                    <Button>Show Resume</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>View {userData.name}&apos;s Resume</AlertDialogTitle>
                        <AlertDialogDescription>
                        Clicking &quot;Open&quot; will show <a className="underline" href={userData.resume_url} target="_blank">Resume URL</a> in New Tab
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Back</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {window.open(userData.resume_url)}}>Open</AlertDialogAction>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>
                    </div>
                    <div className="flex items-center justify-center">
                        <Drawer>
                        <DrawerTrigger>
                            <div role="button" className="h-10 font-medium px-4 py-2 pl-2 text-sm flex flex-row bg-primary text-primary-foreground hover:bg-primary/90 rounded-md items-center pr-4">
                                <Sparkles className="h-5 w-5" /><span className="pl-1">Review Resume with AI</span>
                            </div>
                        </DrawerTrigger>
                        <DrawerContent className="flex items-center justify-center">
                            <DrawerHeader>
                            <DrawerTitle>Please Copy and Paste your <a href={userData.resume_url} className="underline dark:text-customLightBlue text-customDarkBlue" target="_blank">Resume PDF</a> Text into this Box and <i>Save:</i></DrawerTitle>
                            <div>
                                <ResumeForm onFormSubmit={(value) => {toast({title: "Saved"}); setResumeText(value.post)}} />
                            </div>
                            </DrawerHeader>
                            <DrawerFooter>
                            <DrawerClose className="flex flex-col">
                                <Button onClick={() => {if(resumeText){reviewResumeWithAI()}}}>Review</Button>
                                <div className="pt-2"></div>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                        </Drawer>
                    </div>
                    </div>
                )}
                <div className="pt-5"></div>
                    <div className="flex flex-col bg-gray-300 dark:bg-neutral-700 p-6 rounded-3xl text-wrap break-words whitespace-break-spaces">
                        <b className="pb-2">Bio: </b>
                        <span>{userData?.bio}</span>
                    </div>
                <div className="pt-5"></div>
                { userData?.cover_letter && (userType === PROF || isYourPage) &&
                <div>
                <div className="flex flex-col bg-gray-300 dark:bg-neutral-700 p-6 rounded-3xl text-wrap break-words whitespace-break-spaces">
                    <b className="pb-2">Cover Letter:</b>
                    <span>{userData?.cover_letter}</span>
                </div>
                <div className="pb-5"></div>
                </div>
                }
                {userType === 'STUDENT' && (
                    <div>
                        <div className="flex flex-row gap-x-2 text-wrap">
                            {userData?.skills?.map(skill => (
                                <div key={skill} className="bg-gray-300 text-muted-foreground dark:bg-neutral-700 p-3 rounded-xl">
                                    {skill}
                                </div>
                            ))}
                        </div>
                        {isYourPage &&
                            <div>
                                <CoverLetterForm onFormSubmit={onCLSubmit} />
                                <div className="flex flex-row justify-end items-left pt-2 pb-10">
                                    <Button onClick={() => {reviewCLWithAI()}}>
                                        <Sparkles className="h-7 w-7 pr-2" />Review Cover Letter with AI
                                    </Button>
                                </div>
                            </div>
                        }
                    </div>
                )}
            </div>
            <div className="pl-36 pr-36 pb-24 overflow-scroll">
                {userType === STUDENT ? (
                <div className="pt-20">
                {CLloading && <div className="flex flex-row items-center justify-center gap-x-2 pt-5"><Sparkles /> Gemini is Loading...<Spinner size="lg" /></div>}
                {!CLloading && review && <div className="whitespace-break-spaces outline-double outline-muted-foreground p-10 rounded-xl"><MarkdownContent markdown={review}/></div>}
                </div>
                ) : (
                <div className="pt-20">
                    <h1 className="font-bold text-3xl pb-8">{userData?.name}&apos;s Job Postings</h1>
                    {posts && 
                        <PostsList posts={posts}/>
                    }   
                </div>
                ) }
            </div>
        </div>
        </div>
     );
}
 
export default ProfilePage;