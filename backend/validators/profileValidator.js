const { z } = require("zod");

const profileSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    education: z.string().optional(),

    skills: z.array(z.string()).default([]),
    projects: z.array(z.any()).default([]),
    experience: z.array(z.any()).default([]),

    preferred_roles: z.array(z.string()).default([]),
    preferred_locations: z.array(z.string()).default([]),

    work_mode: z.string().optional(),

    github_url: z.string().url().optional(),
    linkedin_url: z.string().url().optional(),
    portfolio_url: z.string().url().optional(),
    resume_url: z.string().url().optional()
});

module.exports = profileSchema;