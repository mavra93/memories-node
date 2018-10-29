import {firebaseApp} from './firebaseInit';
import q from 'q';

const firestore = firebaseApp.firestore();

const query = firestore.collection('users');

export function getUsers() {
    let users = [];
    const deferred = q.defer();
    query.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const user = doc.data();
            users.push(user);
        });
        deferred.resolve(users);
    });
    return deferred.promise;
}