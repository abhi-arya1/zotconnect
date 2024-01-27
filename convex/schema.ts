import { defineSchema, defineTable } from "convex/server"; 
import { v } from "convex/values"; 

// USER TYPES ARE EITHER
// "STUDENT" 
// or
// "PROFESSOR"

const user_post = {
    "title": v.string(),
    "content": v.string(),
    "email": v.string(),
}

const skills = []

export default defineSchema({
    user: defineTable({
        userId: v.string(), 
        userType: v.string(),
        name: v.string(),
        year: v.optional(v.string()),
        major: v.optional(v.string()),
        research_area: v.optional(v.string()),
        bio: v.string(),
        posts: v.optional(v.object(user_post)),
        url: v.optional(v.string()),
        skills: v.optional(v.string()),
    })
    .index("by_userType", ["userType"])
    .index("by_skills", ["skills"])
});