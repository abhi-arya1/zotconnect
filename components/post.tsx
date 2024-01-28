"use client";

import React from 'react';
import { Button } from './ui/button';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

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
}

interface PostProps {
    post: IPost
}

interface PostsListProps {
    posts: IPost[]
}

const Post = ({ post }: PostProps) => {
    const { user } = useUser();
    const userData = useQuery(api.user.getByUserId, {
        userId: user?.id || "Error"
    });

    return (
        <div>
        <div className="flex flex-col bg-gray-200 dark:bg-neutral-700 p-8 rounded-2xl">
            <h3 className="font-bold text-2xl pb-4">{post.title}</h3>
            <div className="flex flex-row text-muted-foreground pb-2">
                <img src={post.pfpUrl} alt="Image" className="rounded-full h-5 w-5" />
                <span className="pl-2 pb-2"><a href={`/profiles/${post.userId}`} className="underline">{post.name}</a>, <a href={`mailto:${post.email}`} className="underline">{post.email}</a></span>
            </div>
            <p className="break-words pb-5 leading-relaxed">{post.contents}</p>

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
                    <Button onClick={() => {window.open(`mailto:${post.email}`)}}>
                        Apply Now
                    </Button>
                )}
            </div>
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

