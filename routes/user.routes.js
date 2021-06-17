const express = require('express');
const router = express.Router();

// additional middleware
const isLogged = (req, res, next) => {
  if(!req.user) {
    res.redirect('/user/no-permission');
  } else {
    next();
  }
}

router.get('/logged', isLogged, (req, res) => {
  const { displayName, photos} = req.user;
  res.render('logged', { name: displayName, photo: photos[0].value });
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

router.get('/profile', isLogged, (req, res) => {
  res.render('userProfile');
});

router.get('/profile/settings', isLogged, (req, res) => {
  res.render('userProfSettings');
});

module.exports = router;