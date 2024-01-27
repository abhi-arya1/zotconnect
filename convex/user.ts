import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

const user_post = {
    "title": v.string(),
    "content": v.string(),
    "email": v.string(),
}

export const createStudent = mutation({
    args: {
        userId: v.string(), 
        userType: v.string(),
        name: v.string(),
        year: v.string(),
        major: v.string(),
        bio: v.string(),
        url: v.string(),
        skills: v.array(v.string()),
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity(); 

        if (!identity) {
            throw new Error("Not Authenticated");
        }

        const userId = identity.subject; 

        const document = await context.db.insert("user",
        {
            userId: userId,
            userType: args.userType,
            bio: args.bio,
            name: args.name,
            year: args.year,
            major: args.major,
            url: args.url,
            skills: args.skills,
        });

        return document; 
    }
})

export const createProf = mutation({
    args: {
        userId: v.string(), 
        userType: v.string(),
        name: v.string(),
        bio: v.string(),
        url: v.string(),
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity(); 

        if (!identity) {
            throw new Error("Not Authenticated");
        }

        const userId = identity.subject; 

        const document = await context.db.insert("user",
        {
            userId: args.userId,
            userType: args.userType,
            bio: args.bio,
            name: args.name,
            url: args.url,
        });

        return document; 
    }
})

export const getByUserId = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        // Verify the identity of the user making the request
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("No Auth");
        }

        const userId = args.userId as Id<"user">
        const user = await ctx.db.get(userId); 
        if (!user) {
            throw new Error("Document Not Found");
        }

        let userData;

        if (user.userType === "PROF") {
            // Structure the document for userType "PROF"
            userData = {
                userId: user.userId,
                userType: user.userType,
                bio: user.bio,
                name: user.name,
                url: user.url
            };
        } else if (user.userType === "STUDENT") {
            // Structure the document for userType "STUDENT" with additional attributes
            userData = {
                userId: user.userId,
                userType: user.userType,
                bio: user.bio,
                name: user.name,
                year: user.year,
                major: user.major,
                url: user.url,
                skills: user.skills
            };
        } else {
            throw new Error("Invalid userType");
        }

        return userData;
    }
});
