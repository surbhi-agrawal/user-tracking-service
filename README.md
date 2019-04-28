The code has been developed using vscode.

Also, please include any questions, assumptions, plans or future considerations by providing a README with your submission.


Questions/Assumptions:
1) Does the event log get written at the same time as creating the account? The implementation is done assuming that the event log will be added in following scenario:
    a) First a check is made whether the account exists in the sytem. If yes, then a login event is added.
    b) If account does not exist, it is added to the system and then event is added.
2) For last day events does it mean the calendar date? Currently it is implemented to return events from last 24 hours which can be configured.


Future Considerations:
1) Have password constraints.
2) Add unit testing.
3) Add configurable variables. Currently for last day 
4) Add more error handling and logging.
5) For more event logging if it going to be heavy it can be thrown on a queue like a Rabbit Queue.
6) Swagger needs to be completed.


# user.tracking.service

The current implementation of the service does the following:
1) /api/login - Create the user account and logs the event in the Mongo database. It creates 2 collections users and events respectively
2) /events - Returns all events.
3) /events/:user - Returns events filtered by email.
4) /events/lastDayEvents - Returns events for last 24 hours
5) /health - To check if the service is up

The service is running on default 3000 port.

## Getting Started

#Setting up mongo db connection string.
The mongo uri will need to be setup in userTracking.db.ts.
Currently it is set to 'mongodb://127.0.0.1:27017/local'

# install all the dependencies
npm i 

#build the service
tsc

# run the service
npm run serve