import * as Joi from 'joi';

/* Schema for login request
email - string value required
password - string value required
phone - string in XXX-XXX-XXXX format optional
*/
export const userLoginRequestSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/, 'XXX-XXX-XXXX correct format'),
});
