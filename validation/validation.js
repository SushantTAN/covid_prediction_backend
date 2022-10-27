//VALIDATION
const Joi = require('@hapi/joi');


//register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi
      .string()
      .min(6)
      .required()
      .max(255),
    email: Joi
      .string()
      .min(6)
      .required()
      .email(),
    password: Joi
      .string()
      .min(6)
      .required(),
    age: Joi
      .number()
      .required(),
    gender: Joi
      .string()
      .required(),
  });
  return schema.validate(data)
}

//login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi
      .string()
      .min(6)
      .required()
      .email(),
    password: Joi
      .string()
      .min(6)
      .required()
  });
  return schema.validate(data)
}

const entryValidation = (data) => {
  const schema = Joi.object({
    fever: Joi
      .number()
      .min(80)
      .max(110)
      .required(),
    body_pain: Joi
      .string()
      .required(),
    runny_nose: Joi
      .string()
      .required(),
    infected: Joi
      .string()
      .required(),
    difficulty_breathing: Joi
      .string()
      .required(),
  });
  return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.entryValidation = entryValidation;