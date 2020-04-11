/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('./config');
const router = require('./router');

const app = express();
const fileStoreOptions = {};
const port = 3000;

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id); 
 // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
});

// sử dụng Facebook Strategy cùng Passport //
passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.callbackURL,
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
// sử dụng body-parser //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({store: new FileStore(fileStoreOptions), secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

app.listen(3000, () => {
  console.log(`Server is running on ${port}`);
});
