const express = require("express");
const profileSchema = require("./validators/profileValidator");
const pool = require("./db");

const app = express();

app.use(express.json());

const PORT = 5000;

// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "Internship Hunter Agent"
    });
});

// Create candidate profile
app.post("/api/profile", async (req, res) => {

    const validation = profileSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            message: "Invalid profile data",
            errors: validation.error.issues
        });
    }

    const profile = validation.data;

    try {

        const query = `
            INSERT INTO candidate_profiles (
                name,
                email,
                phone,
                education,
                skills,
                projects,
                experience,
                preferred_roles,
                preferred_locations,
                work_mode,
                github_url,
                linkedin_url,
                portfolio_url,
                resume_url
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7,
                $8, $9, $10, $11, $12, $13, $14
            )
            RETURNING *;
        `;

        const values = [
            profile.name,
            profile.email,
            profile.phone || null,
            profile.education || null,
            JSON.stringify(profile.skills),
            JSON.stringify(profile.projects),
            JSON.stringify(profile.experience),
            JSON.stringify(profile.preferred_roles),
            JSON.stringify(profile.preferred_locations),
            profile.work_mode || null,
            profile.github_url || null,
            profile.linkedin_url || null,
            profile.portfolio_url || null,
            profile.resume_url || null
        ];

        const result = await pool.query(query, values);

        res.status(201).json({
            message: "Profile created successfully",
            profile: result.rows[0]
        });

   } catch (error) {

    console.error("Database error:", error);

    if (error.code === "23505") {
        return res.status(409).json({
            message: "A profile with this email already exists"
        });
    }

    res.status(500).json({
        message: "Failed to create profile"
    });
}
});

// Start server
app.listen(PORT, () => {
    console.log(
        `Internship Hunter Agent running on http://localhost:${PORT}`
    );
});

// Test database connection
pool.query("SELECT NOW()", (error, result) => {

    if (error) {
        console.error("Database connection failed:", error);
    } else {
        console.log("Database connected:", result.rows[0]);
    }

});