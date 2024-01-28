"use client";

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useUser } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { query } from '@/convex/_generated/server';
import { ConfirmModal } from './modals/confirm_modal';
import { ApplicantsCollapsible } from './applicantsCollapsible';

interface IPost {
    title: string;
    contents: string;
    name: string; 
    email: string;
    pfpUrl: string;
    targetMajors: string[];
    targetSkills: string[];
    targetYears: string[];
    userId: string;
    applications?: string[];
}

interface PostProps {
    post: IPost
}

interface PostsListProps {
    posts: IPost[]
}

const Post = ({ post }: PostProps) => {
    const { user } = useUser();
    const [inApplicants, setInApplicants] = useState(false);
    const addApplicant = useMutation(api.userpost.addApplicant);
    const userData = useQuery(api.user.getByUserId, {
        userId: user?.id || "Error"
    });
    const postApplications = useQuery(api.userpost.getApplicantsByName, {
        userId: post.userId, 
        title: post.title,
    })

    useEffect(() => {
        if (post.applications?.includes(user?.id || "err")) {
            setInApplicants(true);
        }
    }, [post.applications, user?.id]);
    

    return (
        <div>
        <div className="flex flex-col bg-gray-200 dark:bg-neutral-700 p-8 rounded-2xl">
            <h3 className="font-bold text-2xl pb-4">{post.title}</h3>
            <div className="flex flex-row text-muted-foreground pb-2">
                <img src={post.pfpUrl} alt="Image" className="rounded-full h-5 w-5" />
                <span className="pl-2 pb-2"><a href={`/profiles/${post.userId}`} className="underline">{post.name}</a>, <a href={`mailto:${post.email}`} className="underline">{post.email}</a></span>
            </div>
            <p className="break-words pb-5 leading-relaxed whitespace-break-spaces">{post.contents}</p>

            <div className="flex flex-row justify-between items-end">
                <div>
                    <div><b className="text-muted-foreground font-normal">Preferred Majors:</b> {post.targetMajors.join(', ')}</div>
                    <div><b className="text-muted-foreground font-normal">Preferred Skills:</b> {post.targetSkills.join(', ')}</div>
                    <div><b className="text-muted-foreground font-normal">Preferred Years:</b> {post.targetYears.join(', ')}</div>
                </div>
                { userData?.userType === "PROF" ? (
                    <Button onClick={() => {}}>
                        Refer A Student
                    </Button>
                ) : (
                    <div>
                    {!inApplicants &&
                    <ConfirmModal 
                    title="Are You Sure?"
                    description="Applying to a Job is Irreversible"
                    onConfirm={() => {
                        addApplicant({
                        userId: post.userId,
                        title: post.title,
                        applicantId: user?.id || "Err",
                    })}}>
                    <Button>
                        {inApplicants ? (
                            <span>Applied!</span>
                        ) : (
                            <span>Apply Now</span>
                        )}
                    </Button>
                    </ConfirmModal>
                    }
                    {inApplicants &&
                    <Button variant="outline" className="dark:hover:bg-black hover:bg-white cursor-default">
                        Applied
                    </Button>}
                    </div>
                )}
            </div>
            {userData?.userType === "PROF" && postApplications?.length !== 0 &&
            <div className="pt-4">
                <ApplicantsCollapsible postApplications={postApplications || []} />
            </div>
            }
        </div>
        <div className="pb-10"></div>
        </div>
    );
};

const PostsList = ({ posts }: PostsListProps) => {
    return (
        <div className="posts-list">
            {posts.map((post, index) => (
                <Post key={index} post={post} />
            ))}
        </div>
    );
};

export default PostsList;

