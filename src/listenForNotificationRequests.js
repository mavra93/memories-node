import moment from 'moment';
import {getNotifications} from './getNotifications';
import {getUsers} from './getUsers';
import {sendNotification} from './sendNotification';

export function listenForNotificationRequests(now) {
    getNotifications().then(notifications => {
        getUsers().then(users => {
            notifications.forEach(notify => {
                const notifyTime = moment.unix(notify.sendAt);
                users.forEach(user => {
                    if (user.id === notify.to && now.hour() === notifyTime.hour()) {
                        const notification = {
                            to: user.token,
                            data: {
                                custom_notification: {
                                    title: notify.title,
                                    body: notify.description,
                                    color: '#42b72a',
                                    sound: 'default',
                                    priority: 'high',
                                    show_in_foreground: true,
                                }
                            },
                            priority: 10,
                            id: notify.uid
                        };
                        sendNotification(notification);
                    }
                });
            })
        });
    });
}