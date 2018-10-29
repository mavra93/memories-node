import express from 'express';
import cron from 'cron';
import moment from 'moment';
import {listenForNotificationRequests} from './listenForNotificationRequests';

require('heroku-self-ping')("https://mi-node-app.herokuapp.com/");

let app = express();

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), () => {
    console.log('Listening on port', app.get('port'));
});

const cronJob = cron.job('0 * * * *', function () {
    const now = moment();
    console.log("cron job enter", "now:", now);
    listenForNotificationRequests(now);
});
cronJob.start();
