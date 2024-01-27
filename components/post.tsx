import React from 'react';

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
    return (
        <div>
        <div className="flex flex-col bg-gray-200 dark:bg-neutral-700 p-8 rounded-2xl">
            <h3 className="font-bold text-2xl pb-4">{post.title}</h3>
            <div className="flex flex-row text-muted-foreground pb-2">
                <img src={post.pfpUrl} alt="Image" className="rounded-full h-5 w-5" />
                <span className="pl-2 pb-2">{post.name}, {post.email}</span>
            </div>
            <p className="break-words pb-5 leading-relaxed">{post.contents}</p>

            <div><b className="text-muted-foreground font-normal">Preferred Majors:</b> {post.targetMajors.join(', ')}</div>
            <div><b className="text-muted-foreground font-normal">Preferred Skills:</b> {post.targetSkills.join(', ')}</div>
            <div><b className="text-muted-foreground font-normal">Preferred Years:</b> {post.targetYears.join(', ')}</div>
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

