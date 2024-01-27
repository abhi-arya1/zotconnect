import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createPost = mutation({
    args: {
        userId: v.string(), 
        title: v.string(),
        contents: v.string(),
        name: v.string(),
        email: v.string(),
        pfpUrl: v.string(),
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
            pfpUrl: args.pfpUrl,
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
            .first(); 

        if (!user || user === undefined || user === null) {
            throw new Error("User not found");
        }

        const posts = await context.db
            .query("userpost")
            .collect();

        let skills: string[] = user.skills ? user.skills.map(skill => skill.toLowerCase()) : [];
        let major: string = user.major ? user.major : 'ERROR'
        let year: string = user.year ? user.year : "ERROR"

        // Check if user type is STUDENT
        if (user.userType.toLowerCase() === "student") {
            let filteredPosts = posts.filter(post => 
                (skills.length > 0 && post.targetSkills.some(skill => skills.includes(skill.toLowerCase()))) ||
                (user.major && post.targetMajors.some(major => major.toLowerCase() === major.toLowerCase())) ||
                (user.year && post.targetYears.some(year => year.toLowerCase() === year.toLowerCase()))
            );

            return filteredPosts;
        } else {
            return posts;
        }
    }
});
