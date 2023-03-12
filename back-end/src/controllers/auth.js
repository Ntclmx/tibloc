

// // const stringifiedParams = queryString.stringify({
// //   client_id: process.env.CLIENT_ID_GOES_HERE,
// //   redirect_uri: 'localhost:3000/home',
// //   scope: [
// //     'https://www.googleapis.com/auth/userinfo.email',
// //     'https://www.googleapis.com/auth/userinfo.profile',
// //   ].join(' '), // space seperated string
// //   response_type: 'code',
// //   access_type: 'offline',
// //   prompt: 'consent',
// // });

// // exports.googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
// const express = require('express');
// const app = express();
// const passport = require('passport');
// const cookieSession = require('cookie-session');
// require('./passport');
// // import * as queryString from 'query-string';

// // exports.authenticate = (req, res, next) => {
// //   const passport = require('passport')
// //   var userProfile
// //   app.use(passport.initialize())
// //   app.use(passport.session())

// //   app.set('view engine', 'ejs')

// //   app.get('/success', (req, res) => res.send(userProfile))
// //   app.get('/error', (req, res) => res.send('error logging in'))

// //   passport.serializeUser(function (user, cb) {
// //     cb(null, user)
// //   })

// //   passport.deserializeUser(function (obj, cb) {
// //     cb(null, obj)
// //   })

// //   const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
// //   const GOOGLE_CLIENT_ID = '348334482720-r76gtpogm62h5tkdusv3o4fp38rq2hfp.apps.googleusercontent.com'
// //   const GOOGLE_CLIENT_SECRET = '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'
// //   passport.use(
// //     new GoogleStrategy(
// //       {
// //         clientID: GOOGLE_CLIENT_ID,
// //         clientSecret: GOOGLE_CLIENT_SECRET,
// //         callbackURL: 'http://localhost:4000/auth/google/callback',
// //       },
// //       function (accessToken, refreshToken, profile, done) {
// //         userProfile = profile
// //         return done(null, userProfile)
// //       },
// //     ),
// //   )

// //   app.get(
// //     '/auth/google',
// //     passport.authenticate('google', { scope: ['profile', 'email'] }),
// //   )

// //   app.get(
// //     '/auth/google/callback',
// //     passport.authenticate('google', { failureRedirect: '/error' }),
// //     function (req, res) {
// //       // Successful authentication, redirect success.
// //       res.redirect('/success')
// //     },
// //   )
// // }
