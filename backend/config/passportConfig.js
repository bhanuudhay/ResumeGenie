const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://resumegenie-qtr6.onrender.com/auth/google/callback", 
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

// Store user in session
passport.serializeUser((user, done) => {
  done(null, user);
});

//  Retrieve user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});
