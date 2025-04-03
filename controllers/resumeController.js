const axios = require("axios");
require("dotenv").config();

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const API_KEY = process.env.GEMINI_API_KEY;

async function generateResume({
  name,
  jobTitle,
  skills,
  experience,
  education,
  projects,
}) {
  try {
    // Ensure skills and projects are arrays to prevent errors
    skills = Array.isArray(skills) ? skills : [];
    projects =
      projects && projects.length
        ? projects
        : ["No projects provided. Ask for details."];

    const prompt = `Generate a professional resume for ${name}, a ${jobTitle}. 
      Enhance the resume with ATS-friendly keywords related to ${jobTitle}. 
      If the user has not provided project details, suggest adding at least one relevant project and prompt for more details.
      
      Skills: ${skills.join(", ")}. 
      Experience: ${experience}. 
      Projects: ${projects.join(", ")}.
      Education: ${education}. 

      Ensure the output follows this structured format:

      **John Doe**  
      (Contact Information)

      **Summary**  
      (A brief, keyword-optimized summary)

      **Skills**  
      - (List of skills with job-relevant keywords)

      **Experience**  
      - (Job title, Company name, Dates)  
      - (Achievements using quantifiable metrics)

      **Projects**  
      (Include projects if missing. If not provided, suggest a relevant project.)

      **Education**  
      - (Degree, University, Year)

      The resume should be in plain text format, properly formatted with section headers like **Summary**, **Skills**, **Experience**, **Projects**, and **Education**.`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    let resumeText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No resume generated.";

    // ✅ Remove triple backticks if present
    resumeText = resumeText.replace(/```/g, "").trim();

    return resumeText;
  } catch (error) {
    console.error(
      "Error generating resume:",
      error.response?.data || error.message
    );
    throw new Error("Failed to generate resume.");
  }
}

module.exports = generateResume;
