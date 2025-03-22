const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/hello', function(req, res) {
  res.json({ message: 'Hello World 666' });
});

module.exports = router;
