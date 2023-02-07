const Joi = require("joi");
const userSchema = Joi.object(
    {
        login: Joi.string()
        .required()
        .min(6)
        .max(15)
        .alphanum()
        .messages
        ({ 
            "string.min": "Login musi być dłuższy niż 6 znaków",
            "string.max": "Login musi być krótszy niż 15 znaków",
            "string.required": "Login nie powinien być pusty",
            "string.alphanum": "Login nie powinien mieć znaków specjalnych",
        }),
    
        password: Joi.string()
        .min(6)
        .max(15)
        .messages
        ({ 
            "string.min": "Hasło musi być dłuższe niż 6 znaków",
            "string.max": "Hasło musi być krótsze niż 15 znaków",
            "string.required": "Hasło nie powinno być puste",
            "string.pattern": "Hasło musi spełniać wymogi",
        })
    })
        module.exports = userSchema;