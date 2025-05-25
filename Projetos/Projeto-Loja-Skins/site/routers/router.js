const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { titulo: 'PICA D+' });
});

module.exports = router;