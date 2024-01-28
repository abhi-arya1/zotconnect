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
        major: v.string(),
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
            major: args.major,
            name: args.name,
            url: args.url,
        });

        return document; 
    }
})

export const addResume = mutation({
    args: {
        userId: v.string(),
        resumeUrl: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity(); 
        if (!identity) {
            throw new Error("Not Authenticated");
        }
        const userId = identity.subject; 
        
        const existingUser = await ctx.db
        .query("user")
        .filter(q => q.eq(q.field("userId"), args.userId))
        .first();  

        if (!existingUser) { throw new Error("Doesn't Exist!") }
        if (existingUser.userId !== userId) { throw new Error("Unauthorized"); }

        const docId = existingUser._id;

        const data = await ctx.db.patch(docId, { resume_url: args.resumeUrl})
        return data; 
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

        const user = await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("userId"), args.userId))
        .first()

        let userData;

        if (!user) {
            throw TypeError("No User!")
        }

        if (user.userType === "PROF") {
            // Structure the document for userType "PROF"
            userData = {
                userId: user.userId,
                userType: user.userType,
                bio: user.bio,
                name: user.name,
                url: user.url,
                resume_url: user.resume_url
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
                skills: user.skills,
                resume_url: user.resume_url,
            };
        } else {
            throw new Error("Invalid userType");
        }

        return userData;
    }
});
