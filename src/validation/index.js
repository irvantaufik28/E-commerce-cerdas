const Joi = require("joi");

module.exports = {
  register: (body) => {
    return Joi.object()
      .keys({
        email: Joi.string().email().min(6).max(50).required().messages({
          "string.empty": "email cannot be an empty field",
          "any.required": "email is required field",
          "string.email": "Please insert a valid email address",
          "string.min": `Password should have a minimum length of {#limit}`,
          "string.max": `Password should have a maximum length of {#limit}`,
        }),
        password: Joi.string().min(6).required().messages({
          "string.empty": "password cannot be an empty field",
          "any.required": "password is required field",
          "string.password": `Please insert a valid Password'`,
          "string.min": `Password should have a minimum length of {#limit}`,
        }),
        confirmPassword: Joi.string().min(6).required().messages({
          "string.empty": "confrim Password cannot be an empty field",
          "any.required": "confrim Password is required field",
          "string.confirmPassword": `Please insert a valid confirm Password address'`,
          "string.min": `Confrim Password should have a minimum length of {#limit}`,
        }),
        phone_number: Joi.string()
          .regex(/^[0-9]*$/)
          .required()
          .messages({
            "string.empty": "Phone number cannot be an empty field",
            "any.required": "Phone number is required field",
            "string.phone_number": `Please insert a valid Phone number'`,
          }),
        first_name: Joi.string().min(3).max(32).required().messages({
          "string.empty": "first_name cannot be an empty field",
          "any.required": "first_name is required field",
          "string.first_name": `Please insert a valid first name'`,
          "string.min": `First Name should have a minimum length of {#limit}`,
          "string.max": `First Name should have a maximum length of {#limit}`,
        }),
        last_name: Joi.string().min(3).max(32).required().messages({
          "string.empty": "last_name cannot be an empty field",
          "any.required": "last_name is required field",
          "string.last_name": `Please insert a valid first name'`,
          "string.min": `last_name should have a minimum length of {#limit}`,
          "string.max": `last_name should have a maximum length of {#limit}`,
        }),
        address: Joi.string().min(3).max(255).required().messages({
          "string.empty": "address cannot be an empty field",
          "any.required": "address is required field",
          "string.address": `Please insert a valid first name'`,
          "string.min": `Address should have a minimum length of {#limit}`,
          "string.max": `Address should have a maximum length of {#limit}`,
        }),
        gender: Joi.string().valid("MALE", "FEMALE").required().messages({
          "string.empty": "Gender cannot be an empty field",
          "string.valid": "Gender must be field MALE Or FEMALE",
          "any.required": "Gender is required field",
        }),
        image: Joi.string().allow(null),
      })
      .validate(body);
  },
  login: (body) => {
    return Joi.object()
      .keys({
        email: Joi.string().email().min(6).max(50).required().messages({
          "string.empty": "email cannot be an empty field",
          "any.required": "email is required field",
          "string.email": "Please insert a valid email address",
          "string.min": `Password should have a minimum length of {#limit}`,
          "string.max": `Password should have a maximum length of {#limit}`,
        }),
        password: Joi.string().min(6).required().messages({
          "string.empty": "password cannot be an empty field",
          "any.required": "password is required field",
          "string.password": `Please insert a valid Password'`,
          "string.min": `Password should have a minimum length of {#limit}`,
        }),
      })
      .validate(body);
  },
  updateProfile: (body) => {
    return Joi.object()
      .keys({
        phone_number: Joi.string()
          .regex(/^[0-9]*$/)
          .messages({
            "string.phone_number": `Please insert a valid Phone number'`,
          }),
        first_name: Joi.string().min(3).max(32).messages({
          "string.first_name": `Please insert a valid first name'`,
          "string.min": `First Name should have a minimum length of {#limit}`,
          "string.max": `Firs Name should have a maximum length of {#limit}`,
        }),
        last_name: Joi.string().min(3).max(32).messages({
          "string.last_name": `Please insert a valid first name'`,
          "string.min": `last name should have a minimum length of {#limit}`,
          "string.max": `last name should have a maximum length of {#limit}`,
        }),
        address: Joi.string().min(3).max(255).messages({
          "string.address": `Please insert a valid first name'`,
          "string.min": `Address should have a minimum length of {#limit}`,
          "string.max": `Address should have a maximum length of {#limit}`,
        }),
        image: Joi.string().allow(null),
      })
      .validate(body);
  },
  createProduct: (body) => {
    return Joi.object()
    .keys({
      name_product: Joi.string().min(3).max(32).required().messages({
        "string.empty": "name product cannot be an empty field",
        "any.required": "name product is required field",
        "string.first_name": `Please insert a valid first name'`,
        "string.min": `name product should have a minimum length of {#limit}`,
        "string.max": `name product should have a maximum length of {#limit}`,
      }),
      price: Joi.number().required().messages({
        "string.empty": "price product cannot be an empty field",
        "any.required": "price product is required field",
        "number.price": `Please insert a valid first name'`,
      }),
      descripition: Joi.string().min(15).max(255).required().messages({
        "string.empty": "descripition cannot be an empty field",
        "any.required": "descripition is required field",
        "string.descripition": `Please insert a valid first name'`,
        "string.min": `descripition should have a minimum length of {#limit}`,
        "string.max": `descripition should have a maximum length of {#limit}`,
      }),
      image: Joi.string().allow(null),
    })
    .validate(body);
  },
  forgetPassworValidation: (body) => {
    return Joi.object()
    .keys({
      email: Joi.string().email().min(6).max(50).required().messages({
        "string.empty": "email cannot be an empty field",
        "any.required": "email is required field",
        "string.email": "Please insert a valid email address",
        "string.min": `Password should have a minimum length of {#limit}`,
        "string.max": `Password should have a maximum length of {#limit}`,
      }),
      newPassword: Joi.string().min(6).required().messages({
        "string.empty": "password cannot be an empty field",
        "any.required": "password is required field",
        "string.newPassword": `Please insert a valid Password'`,
        "string.min": `Password should have a minimum length of {#limit}`,
      }),
      confirmNewPassword: Joi.string().min(6).required().messages({
        "string.empty": "confrim Password cannot be an empty field",
        "any.required": "confrim Password is required field",
        "string.confirmNewPassword": `Please insert a valid confirm Password '`,
        "string.min": `Confrim Password should have a minimum length of {#limit}`,
      }),
      otp_code: Joi.string().required().messages({
        "string.empty": "otp_code cannot be an empty field",
        "any.required": "otp_code is required field",
        "string.otp_code": `Please insert a valid otp_code'`,
      })
    })
    .validate(body)
  }
};
