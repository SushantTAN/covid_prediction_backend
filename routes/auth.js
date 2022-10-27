const router = require('express').Router();
const User = require('../model/User');
const Entry = require('../model/entry');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../validation/validation');

router.post('/register', async (req, res) => {

  //Validating data before creating user
  const { error } = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //check if user is already in database
  const emailExists = await User.findOne({ email: req.body.email });

  if (emailExists) return res.status(400).send({ email: ['Email already exists'] });

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //creating new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    age: req.body.age,
    gender: req.body.gender
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user });
  }
  catch (err) {
    console.log("errrr", err);
    res.status(400).send(err);
  }

});

//login
router.post('/login', async (req, res) => {
  //Validating data before logging in
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ detail: ['Email is not found'] });

  //check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send({ detail: ['Invalid password'] });

  //create and assign a token
  const token = jwt.sign({
    name: user.name,
    _id: user._id,
    // email: user.email,
  }, process.env.TOKEN_SECRET);

  // let decoded = jwt.verify(token, process.env.TOKEN_SECRET)

  // console.log("test", decoded, user);

  // res.header('auth-token', token).send(token);
  res.setHeader('auth-token', token);

  res.send({
    access_token: token,
    user_id: user._id
  });

});

router.get('/profile', (req, res) => {

  let token = req.get('Authorization');
  let decoded = jwt.verify(token, process.env.TOKEN_SECRET);

  User.findOne({ _id: decoded._id })
    .then(async user => {

      let entries = await Entry.find().where("user").equals(decoded._id);

      res.send({
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        entries
      })
    })
    .catch(err => res.status(400).send(err))
});

module.exports = router;