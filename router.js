/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');
const passport = require('passport');

const router = express.Router();

module.exports = (() => {
  router.get('/', function(req, res) {
    res.render('home', { user: req.user });
  });
  router.get('/login', function(req, res) {
    // Return to login
  });
  router.get('/account', ensureAuthenticated, function(req, res) {
    res.render('/account', { user: req.user });
  });

  router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

  router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login'}), function(req, res) {
    res.redirect('/');
  });

  router.get('/logout', function(req, res) {
    req.logout('/');
    res.redirect('/');
  });

  return router;
});

// thử authenticated //
 function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
};
