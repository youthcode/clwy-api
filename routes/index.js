const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json({ message: 'Hello World 12-12' });
});

module.exports = router;
