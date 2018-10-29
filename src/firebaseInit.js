import * as admin from 'firebase-admin'
import {config} from './config/config';

export const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(config.serviceAccount),
    databaseURL: config.databaseURL
});