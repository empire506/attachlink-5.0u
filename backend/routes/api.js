// routes/api.js
const express = require('express');
const router = express.Router();
const jobs = require('../data/jobs.json');
const blog = require('../data/blog.json');

// GET /api/jobs
router.get('/jobs', (req, res) => {
    res.json(jobs);
});

// GET /api/blog
router.get('/blog', (req, res) => {
    res.json(blog);
});

// GET /api/profile (mock student data)
router.get('/profile', (req, res) => {
    res.json({
        name: "John Doe",
        program: "Computer Science Student",
        university: "University of Nairobi",
        profileCompletion: 85,
        stats: {
            active: 2,
            shortlisted: 5,
            hired: 1
        }
    });
});

module.exports = router;