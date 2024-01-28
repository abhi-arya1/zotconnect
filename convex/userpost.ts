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

export const getPostsMadeBy = query({
    args: { 
        userId: v.string(),
    },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not Authenticated");
        }

        const user = await ctx.db
            .query("user")
            .filter(q => q.eq(q.field("userId"), args.userId))
            .first(); 

        if (!user) {
            return;
        }

        const posts = await ctx.db
            .query("userpost")
            .filter(q => q.eq(q.field("userId"), args.userId))
            .collect()

        return posts
        }
    })


export const addApplicant = mutation({
    args: {
        userId: v.string(), 
        title: v.string(),
        applicantId: v.string()
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity(); 

        if (!identity) {
            throw new Error("Not Authenticated");
        }

        const userId = identity.subject; 

        const post = await context.db
        .query("userpost")
        .filter(q => q.eq(q.field("userId"), args.userId))
        .filter(q => q.eq(q.field("title"), args.title))
        .first()

        if(!post) { throw new Error("No Post!") }

        const docId = post?._id;

        let applications = post.applications || [];
        applications.push(args.applicantId);

        const document = await context.db.patch(docId, {
            applications: applications
        });

        return document;
    }
})

export const getApplicantsByName = query({
    args: {
        userId: v.string(), 
        title: v.string(),
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity(); 

        if (!identity) {
            throw new Error("Not Authenticated");
        }

        const post = await context.db
            .query("userpost")
            .filter(q => q.eq(q.field("userId"), args.userId))
            .filter(q => q.eq(q.field("title"), args.title))
            .first();

        if (!post) {
            throw new Error("No Post!");
        }

        if (!post.applications || post.applications.length === 0) {
            return []; 
        }

        let users = [];
        for (let applicantId of post.applications) {
            let user = await context.db
                .query("user")
                .filter(q => q.eq(q.field("userId"), applicantId))
                .first();
            if (user) {
                let email;
                user.email ? email = user.email : email = ""
                users.push([user.name, user.userId, email]);
            }
        }

        console.log(users)

        return users;
    }
});



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

        let skills = user.skills ? user.skills.map(skill => skill.toLowerCase()) : [];
        let userMajor = user.major ? user.major.toLowerCase() : 'ERROR';
        //let userYear = user.year ? user.year.toLowerCase() : "ERROR";

        if (user.userType.toLowerCase() === "student") {
            let filteredPosts = posts.filter(post => {
                let postSkills = post.targetSkills.map(skill => skill.toLowerCase());
                let postMajors = post.targetMajors.map(major => major.toLowerCase());
                //let postYears = post.targetYears.map(year => year.toLowerCase());

                return (skills.length > 0 && postSkills.some(skill => skills.includes(skill))) &&
                       (user.major && postMajors.includes(userMajor))
            });

            return filteredPosts;
        } else {
            return posts;
        }
    }
});
