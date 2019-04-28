import * as Joi from 'joi';
import * as moment from 'moment-timezone';
import * as mongoose from 'mongoose';
import { userTrackingDB } from '../services/data/userTracking.db';
// tslint:disable-next-line:no-var-requires
const Joigoose = require('joigoose')(mongoose);

/* Schema for the user model

*/
const UserSchema = Joigoose.convert({
    createdAt: Joi.date().required(),
    emailId: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string(),
    userId: Joi.string().required(),
});

export interface IUser {
    createdAt: Date;
    emailId: string;
    password: string;
    phone: string;
    userId: string;
}

type UserType = IUser & mongoose.Document;
export const UserJoiGoose: mongoose.Schema = new mongoose.Schema(UserSchema, { minimize: false });
UserJoiGoose.index({emailId: 1}, { name: 'emailId', unique: true, background: true});

// index added for users collection
UserJoiGoose.index({userId: 1});

export const User = (userTrackingDB as mongoose.Connection).model<UserType>('user', UserJoiGoose);
