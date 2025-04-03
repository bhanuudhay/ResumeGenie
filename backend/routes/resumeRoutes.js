const express = require("express");
const router = express.Router();
const generateResume = require("../controllers/resumeController");

router.post("/generate", async (req, res) => {
  try {
    const { name, jobTitle, skills, experience, education } = req.body;

    if (!name || !jobTitle || !skills || !experience || !education) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const resume = await generateResume({
      name,
      jobTitle,
      skills,
      experience,
      education,
    });
    res.json({ resume });
  } catch (error) {
    console.error("Error generating resume:", error);
    res.status(500).json({ error: "Failed to generate resume" });
  }
});

router.get("/sample", (req, res) => {
  res.json({
    name: "John Doe",
    jobTitle: "Software Engineer",
    skills: ["JavaScript", "React", "Node.js"],
    experience: "2 years of experience in web development",
    education: "B.Tech in Computer Science",
  });
});

module.exports = router;
