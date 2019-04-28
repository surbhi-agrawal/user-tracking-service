import * as express from 'express';
import * as Joi from 'joi';
import * as uuid from 'uuid';

import { userLoginRequestSchema } from '../events/userLoginRequest.event';
import { Event, EventTypeEnum } from '../models/event.model';
import { User } from '../models/user.model';
const router = express.Router();

router.post('/login', (req, res) => {
    Joi.validate(req.body, userLoginRequestSchema, (error, value) => {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            let userId = uuid();
            User.findOne({ emailId: req.body.email }, (err, user) => {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else {
                    if (!user) {
                        let newUser;
                        let createUser = new Promise((resolve, reject) => {
                            newUser = User.create({
                                createdAt: new Date(),
                                emailId: req.body.email,
                                password: req.body.password,
                                phone: req.body.phone,
                                userId,
                            });

                        });
                        newUser.then((success) => {
                            Event.create({
                                createdAt: new Date(),
                                eventType: EventTypeEnum.Login,
                                userId,
                            });
                            res.send(value);
                        });

                        newUser.catch((createUserError) => {
                            res.status(500);
                            res.send(createUserError);
                        });
                    } else {
                        userId = user.userId;
                        Event.create({
                            createdAt: new Date(),
                            eventType: EventTypeEnum.Login,
                            userId,
                        });
                        res.send(value);
                    }

                }

            });
        }
    });
});

module.exports = router;
