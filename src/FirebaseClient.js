const axios = require('axios');
import {config} from './config/config';
import {setDelivered} from './setDelivered';

class FirebaseClient {

    send(body) {
        const axiosConfig = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'key=' + config.serverKey
            }
        };

        axios.post(config.apiUrl, JSON.stringify(body), axiosConfig)
            .then((res) => {
                setDelivered(body.id);
                console.log("RESPONSE RECEIVED: ", res);
            })
            .catch((err) => {
                console.log("ERROR: ", err);
            })
    }
}

const firebaseClient = new FirebaseClient();
export default firebaseClient;