const Joi = require('joi');

const UserSchema = Joi.object({ // I want to receive an object
    // I want the firstname, lastname, mail and password to match the regex pattern
    // And I want the nickname to match the methods called by Joi
    firstname: Joi.string().pattern(/^[a-zA-ZàáâäãåąăčćęèéêëėěįìíîïłńòóőôöõøřùúûüųūÿýżźñçčšśžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ðĶņ ,.'-]+$/u).required(), 
    lastname: Joi.string().pattern(/^[a-zA-ZàáâäãåąăčćęèéêëėěįìíîïłńòóőôöõøřùúûüųūÿýżźñçčšśžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ðĶņ ,.'-]+$/u).required(),
    nickname: Joi.string().alphanum().min(3).max(30).required(),
    mail: Joi.string().pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required(),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
    // repeat_password: Joi.ref("password"), See in future versions
}); // .with('password', 'repeat_password'); See in future versions

// The schema for the route patch password
const PasswordSchema = Joi.object({
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
    newPassword: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required()
});

module.exports = { UserSchema, PasswordSchema };