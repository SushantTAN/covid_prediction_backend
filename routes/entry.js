const router = require('express').Router();
const Entry = require('../model/entry');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { entryValidation } = require('../validation/validation');

router.post('/create', async (req, res) => {
  //Validating data before logging in
  const { error } = entryValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newEntry = new Entry({
    ...req.body
  });

  newEntry.save()
    .then(() => res.send(newEntry))
    .catch(err => res.status(400).send('Error: ' + err))

  // let decoded = jwt.verify(token, process.env.TOKEN_SECRET)
});

router.get('/list', (req, res) => {
  Entry.find()
    .then(entries => res.send(entries))
    .catch(err => res.status(400).send(err))
});


module.exports = router;