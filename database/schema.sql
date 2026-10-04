CREATE TABLE candidate_profiles (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),

    education TEXT,

    skills JSONB DEFAULT '[]',
    projects JSONB DEFAULT '[]',
    experience JSONB DEFAULT '[]',

    preferred_roles JSONB DEFAULT '[]',
    preferred_locations JSONB DEFAULT '[]',

    work_mode VARCHAR(50),

    github_url TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    resume_url TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);