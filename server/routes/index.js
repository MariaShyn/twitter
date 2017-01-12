var express = require('express'),
    router = express.Router(),
    jwt = require('express-jwt'),
    ctrlProfile = require('../libs/profile'),
    ctrlAuth = require('../libs/authentification');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});


router.get('/profile', auth, ctrlProfile.profileRead);

router.post('/', ctrlAuth.login);
router.post('/signup', ctrlAuth.register);

router.post('/newtwit', function (req, res) {
  req.user.addNewTwit(req.body);
  res.end();
});

module.exports = router;
