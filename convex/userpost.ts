import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const createPost = mutation({
    args: {
        userId: v.string(), 
        title: v.string(),
        contents: v.string(),
        name: v.string(),
        targetMajors: v.array(v.string()),
        targetSkills: v.array(v.string()),
        targetYear: v.string()
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
            targetMajors: args.targetMajors,
            targetSkills: args.targetSkills,
            targetYear: args.targetYear
        });

        return document;
    }
})