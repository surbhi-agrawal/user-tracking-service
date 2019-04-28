The code has been developed using vscode.

Assumptions:
1) The event log gets written at the same time of account creation. The implementation is done assuming that the event log will be added in following scenarios:
    a) First a check is made whether the account exists in the system. If yes, then a login event is added.
    b) If account does not exist, it is added to the system and then event log entry is added.
2) Last day's events returns events for a duration of past 24 hours.


Future considerations:
1) Add password constraints.
2) Add unit testing.
3) Add configurable variables like duration, etc.
4) Add more error handling and logging.
5) More event logging if required can be queued using RabbitMQ.
6) Swagger can be provided.


# user.tracking.service
The current implementation of the service does the following:
1) /api/login - Create the user account and logs the event in the Mongo database. It creates 2 collections - users and events, respectively
2) /events - Returns all events.
3) /events/:email - Returns events filtered by email.
4) /events/lastDayEvents - Returns events for past 24 hours
5) /health - To check if the service is up

The service runs on default 3000 port.

## Getting Started

#Setting up mongo db connection string.
The mongo connection string will need to be setup in userTracking.db.ts.
Currently it is set to 'mongodb://127.0.0.1:27017/local'

# install all the dependencies
npm i 

#build the service
tsc

# run the service
npm run serve