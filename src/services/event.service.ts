import * as express from 'express';
import * as moment from 'moment-timezone';
import { Event, IEvent } from '../models/event.model';
import { IUser, User } from '../models/user.model';

const router = express.Router();

/*
Returns all the events - no filter
*/
router.get('/', (req, res) => {
  console.log('return all events');
  Event.find((err: any, events: IEvent[]) => {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      if (events && events.length !== 0) {
        res.send(events);
      } else {
        res.status(404); // no matching records found
        res.send(events);
      }
    }
  });
});
/*
Returns Data for events logged in last 24 hours.
*/
router.get('/lastDayEvents', (req, res) => {
  let now = new Date();
  let startDate = new Date(now.getTime() - 24 * 3600 * 1000);

  Event.find({ createdAt: { $gt: startDate } }, (err, events: IEvent[]) => {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      let returnEvents: IEvent[] = [];

      let promise = new Promise((resolve, reject) => {
        events.forEach((x, index, array) => {
          User.findOne({ userId: x.userId }, (findOneErr, user: IUser) => {
            if (findOneErr) {
              if (array.length - 1 === index) {
                resolve();
              }
            }
            if (user) {
              x.userId = user.emailId;
              returnEvents.push(x);
              if (array.length - 1 === index) {
                resolve();
              }
            } else {
              if (array.length - 1 === index) {
                resolve();
              }
            }

          });
        });
      });
      promise.then((completed) => {
        res.send(returnEvents);
      });
    }
  });
});

/*
Returns all the events for a particular user
*/
router.get('/:email', (req, res) => {
  console.log('return events by user');
  User.findOne({ emailId: req.params.email }, (error, user) => {
    if (error) {
      res.status(500);
      res.send(error);
    } else {
      if (user) {
        Event.find({ userId: user.userId }, (err: any, events: IEvent[]) => {
          if (err) {
            res.status(500);
            res.send(err);
          } else {
            if (events && events.length !== 0) {
              res.send(events);
            } else {
              res.status(404); // no matching records found
              res.send('No matching records found');
            }
          }
        });

      } else {
        res.status(404);
        res.send('No matching account found');
      }
    }
  });

});

module.exports = router;
