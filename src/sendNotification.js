import firebaseClient from './FirebaseClient';

export function sendNotification(notification) {
    firebaseClient.send(notification);
}