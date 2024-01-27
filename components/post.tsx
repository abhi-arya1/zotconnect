import React from 'react';

interface IPost {
    title: string;
    contents: string;
    name: string; 
    email: string;
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
    const sendEmail = post.email;
    return (
        <div className="">
            <h3>{post.title}</h3>
            <p>{post.contents}</p>
            <div><b>Professor: </b> {post.name}, </div>
            <div><b>Target Majors:</b> {post.targetMajors.join(', ')}</div>
            <div><b>Target Skills:</b> {post.targetSkills.join(', ')}</div>
            <div><b>Target Years:</b> {post.targetYears.join(', ')}</div>
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

