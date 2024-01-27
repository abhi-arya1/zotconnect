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
        skills: v.string(),
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
            bio: args.bio
            
        });

        return document; 
    }
})

export const createProf = mutation({
    args: {
        userId: v.string(), 
        userType: v.string(),
        name: v.string(),
        year: v.string(),
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
            bio: args.bio
            
        });

        return document; 
    }
})