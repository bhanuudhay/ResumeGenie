const express = require("express");
const passport = require("passport");
const isAuthenticated = require("../middleware/authMiddleware");

const router = express.Router();

//  1: Redirect to Google Login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//  2: Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard"); // Redirect after login
  }
);

router.get("/login", (req, res) => {
  res.redirect("/auth/google");
});

//  3: Logout Route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send("Error logging out");
    req.session.destroy(() => {
      res.redirect("/"); // Redirect after logout
    });
  });
});

//  4: Get Current Logged-In User
router.get("/user", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ msg: "Not authenticated" });
  }
});

//  Protect Dashboard Route
router.get("/dashboard", isAuthenticated, (req, res) => {
  res.json({ message: "Welcome to your dashboard!", user: req.user });
});

module.exports = router;
