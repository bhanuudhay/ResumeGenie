const express = require("express");
const passport = require("passport");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const { createClient } = require("redis");
require("dotenv").config();
require("./config/passportConfig"); // Load Google OAuth config

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

// ✅ Redis Client Setup
const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379", // Update for production
});
redisClient.connect().catch(console.error);

// ✅ Session Middleware with Redis Store
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || "supersecretkey", // Secret key for session encryption
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Secure cookies in production
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(passport.initialize());
app.use(passport.session()); // Enables persistent login sessions

app.use(express.json()); // Enable JSON body parsing

app.use("/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
