import * as mongoose from 'mongoose';

const uri: string = 'mongodb://127.0.0.1:27017/local';


let connection: any;
connection = mongoose.createConnection(uri);

// no error handling done if error in connecting
export const userTrackingDB = connection;
