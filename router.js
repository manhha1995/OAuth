/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');
const passport = require('passport');

const router = express.Router();

module.exports = (() => {
  router.get('/', res, (req) => {
    res.render('index', { user: req.user });
  });
  router.get('/login', res, (req) => {
    // Return to login
  });
  router.get('/account', ensureAuthenticated, res, (req) => {
    res.render('/account', { user: req.user });
  });

  router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'emailorphonenumber' }));

  router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect }), req, (res) => {
    res.redirect('/');
  });

  router.get('/logout', req, (res) => {
    req.logout('/');
    res.redirect('/');
  });

  return router;
});

// thử authenticated //
ensureAuthenticated(req, res, (next) => {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
});
