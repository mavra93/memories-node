import {firebaseApp} from './firebaseInit';

const firestore = firebaseApp.firestore();

export function setDelivered(id) {
    const notification = {
        delivered: true
    };

    firestore.collection('notifications').doc(id).update(notification).then(() => {
        console.log('notification delivered');
    });
}