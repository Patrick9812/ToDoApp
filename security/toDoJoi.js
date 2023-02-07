const Joi = require('@hapi/joi');

const toDoSchema = Joi.object(
    {
        title: Joi.string()
        .required()
        .min(2)
        .trim()
        .max(40)
        .messages
        ({ 
            "string.min": "Tytuł musi być dłuższy niż 2 znaków",
            "string.max": "Tytuł musi być krótszy niż 40 znaków",
            "string.required": "Tytuł nie powinien być pusty",
        }),
    
        stan: Joi.string()
        .min(6)
        .max(15)
        .valid("Do Zrobienia", "W Trakcie", "Zrobione")
        .messages
        ({ 
            "string.required": "Hasło nie powinno być puste",
            "string.valid": "Podano zły stan",
        }),

        date: Joi.string()
        .optional()
        .isoDate()
        .messages
        ({ 
            "date: required": "Data nie może być pusta",
            "date.isoDate": "To zły format daty. Podaj Rok - Miesiąc - Dzień"
        }),
    })
        module.exports = toDoSchema;