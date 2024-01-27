import { defineSchema, defineTable } from "convex/server"; 
import { v } from "convex/values"; 


export default defineSchema({
    documents: defineTable({
        userId: v.string(), 
        bio: v.string(),
        posts: v.object(),
        url: v.string()

    })
    
});