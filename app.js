/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('./config');
const router = require('./router');

const app = express();

// sử dụng passport //
passport.serializeUser(user, (done) => {
  done(null, user.id);
});

passport.deserializeUser(obj, (done) => {
  done(null, obj);
});

// sử dụng Facebook Strategy cùng Passport //
passport.use(new FacebookStrategy({
  clientID: config.facebook.clentId,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.callbackURL,
},
(accessToken, refreshToken, profile, (done) => {
  process.nextTick(() => {
    console.log(accessToken, refreshToken, profile, done);
    return done(null, profile);
  });
})));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');
// sử dụng body-parser //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: '', key: '' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

app.listen(3000, 'localhost', () => {
  console.log('Server is runing on localhost:3000');
});
