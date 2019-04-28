import * as mongoose from 'mongoose';

// const uri: string = 'mongodb://127.0.0.1:27017/local';

// tslint:disable-next-line:max-line-length
const uri: string = 'mongodb://stndev:stn1505@awsmdbclusterdev01-shard-00-00-6rxpc.mongodb.net:27017,awsmdbclusterdev01-shard-00-01-6rxpc.mongodb.net:27017,awsmdbclusterdev01-shard-00-02-6rxpc.mongodb.net:27017/SurbhiTest?authSource=admin&ssl=true&replicaSet=AWSMDBCLUSTERDEV01-shard-0';
let connection: any;
connection = mongoose.createConnection(uri);

// no error handling done if error in connecting
export const userTrackingDB = connection;
