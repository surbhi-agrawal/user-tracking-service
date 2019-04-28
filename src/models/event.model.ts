import * as Joi from 'joi';
import * as joigooseLib from 'joigoose';
import * as mongoose from 'mongoose';
import { userTrackingDB } from '../services/data/userTracking.db';
// tslint:disable-next-line:no-var-requires
const Joigoose = require('joigoose')(mongoose);

/* Event type enus */
export enum EventTypeEnum {
    Login = 'Login',
    Misc = 'Misc',
}

/* Schema for the event model

*/
const EventSchema = Joigoose.convert({
    createdAt: Joi.date().required(),
    status: Joi.string().valid(Object.keys(EventTypeEnum)),
    userId: Joi.string().required(),
});

export interface IEvent {
    createdAt: Date;
    eventType: EventTypeEnum;
    userId: string;
}

type EventType = IEvent & mongoose.Document;

export const EventJoiGoose: mongoose.Schema = new mongoose.Schema(EventSchema, { minimize: false });

// indexes added for events collection
EventJoiGoose.index({createAt: 1});
EventJoiGoose.index({userId: 1});

export const Event = (userTrackingDB as mongoose.Connection).model<EventType>('event', EventJoiGoose);
