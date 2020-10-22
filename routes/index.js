const express = require('express')
const router = express.Router()


router.get('/', async function(req, res, next) {
  let options = {
    'name': 'The Gallery App',
    'title': 'The Gallery',
    'styles': ['/stylesheets/second.css', '/stylesheets/style.css']

  }

  res.render('index.hbs', options);
});
module.exports = router;


