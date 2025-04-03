npm install express passport passport-google-oauth20 cookie-session dotenv axios

why express :

Express is a lightweight web framework for Node.js.
Minimal & fast framework.
Middleware support (e.g., authentication, logging).

but not optimized as compare to next.js

why passport
Passport.js is an authentication middleware for Node.js.
It allows us to integrate multiple authentication methods, like Google OAuth, Facebook, GitHub, etc.

can be tricky for begineer
Managing sessions manually

why passport-google-oauth20
This is a specific Google OAuth 2.0 authentication strategy for Passport.js.
It allows users to sign in using their Google account.
A strategy in Passport.js - set of authentication rules and methods that tells Passport how to authenticate users using a specific service, such as Google, GitHub, or Facebook.

Requires Google API setup

cookie-session
no db thats why used to store data on cookie
This package helps store session data in cookies securely

Not ideal for large-scale applications
session expired cookies cleared

axios , nodemon , express-async-error and dotenv are well aware

npm install @google/generative-ai

official Google Gemini AI SDK.

new GoogleGenerativeAI(...) → Creates an instance of the AI model.
