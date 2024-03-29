import { defineSchema, defineTable } from "convex/server"; 
import { v } from "convex/values"; 

// USER TYPES ARE EITHER
// "STUDENT" 
// or
// "PROFESSOR"


export default defineSchema({
    user: defineTable({
        userId: v.string(), 
        userType: v.string(),
        name: v.string(),
        bio: v.string(),
        year: v.optional(v.string()),
        major: v.optional(v.string()),
        resume_url: v.optional(v.string()),
        cover_letter: v.optional(v.string()),
        url: v.optional(v.string()),
        skills: v.optional(v.array(v.string())),
        email: v.optional(v.string()),
    })
    .index("by_userType", ["userType"])
    .index("by_skills", ["skills"]),

    userpost: defineTable({
        title: v.string(),
        contents: v.string(),
        userId: v.string(),
        name: v.string(),
        email: v.string(),
        pfpUrl: v.string(),
        targetMajors: v.array(v.string()),
        targetSkills: v.array(v.string()),
        targetYears: v.array(v.string()),
        applications: v.optional(v.array(v.string()))
    })
    .index("byTargetMajors", ["targetMajors"])
    .index("byTargetSkills", ["targetSkills"])
    .index("byTargetYears", ["targetYears"])
});