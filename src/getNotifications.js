import {firebaseApp} from './firebaseInit';
import q from 'q';

const firestore = firebaseApp.firestore();
firestore.settings({timestampsInSnapshots: true});

const query = firestore.collection('notifications').where('delivered', '==', false);

function prepareNotifications(querySnapshot) {
    const notifications = [];
    querySnapshot.forEach(doc => {
        const notification = doc.data();
        notification.uid = doc.id;
        notifications.push(notification);
    });
    return notifications;
}

export function getNotifications() {
    const deferred = q.defer();
    query.get().then((querySnapshot) => {
        let notifications = prepareNotifications(querySnapshot);
        deferred.resolve(notifications);
    });
    return deferred.promise;
}