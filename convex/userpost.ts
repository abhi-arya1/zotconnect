import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const createPost = mutation({
    args: {
        userId: v.string(), 
        title: v.string(),
        contents: v.string(),
        name: v.string(),
        email: v.string(),
        targetMajors: v.array(v.string()),
        targetSkills: v.array(v.string()),
        targetYears: v.array(v.string())
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity(); 

        if (!identity) {
            throw new Error("Not Authenticated");
        }

        const userId = identity.subject; 

        const document = await context.db.insert("userpost",
        {
            userId: userId,
            title: args.title,
            contents: args.contents,
            name: args.name,
            email: args.email,
            targetMajors: args.targetMajors,
            targetSkills: args.targetSkills,
            targetYears: args.targetYears,
        });

        return document;
    }
})


export const getPostsByUser = query({
    args: {
        userId: v.string(), 
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity(); 

        if (!identity) {
            throw new Error("Not Authenticated");
        }

        const user = await context.db
            .query("user")
            .filter(q => q.eq(q.field("userId"), args.userId))
            .first();  // Assuming this fetches a single user

        if (!user || user === undefined || user === null) {
            throw new Error("User not found");
        }

        const posts = await context.db
            .query("userpost")
            .collect();

        let skills: string[];
        if(user.skills) {
            skills = user.skills
        } else {
            skills = []
        }

        // Check if user type is STUDENT
        if (user.userType === "STUDENT") {
            let filteredPosts = posts.filter(post => 
                (user.skills && user.skills.length > 0 && post.targetSkills.some(skill => skills.includes(skill))) ||
                (user.major && post.targetMajors.some(major => major === user.major)) ||
                (user.year && post.targetYears.some(year => year === user.year))
            );

            return filteredPosts;
        } else {
            // If user type is not STUDENT, return all posts
            return posts;
        }
    }
});

