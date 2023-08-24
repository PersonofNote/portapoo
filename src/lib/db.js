import { MongoClient } from "mongodb"
import { DB_URI } from '$env/static/private';

const client = new MongoClient(DB_URI);

export function start_mongo() {
    console.log('Connecting to Mongo...');
    return client.connect();
}

export const db = client.db('portapoo');

export const markers = db.collection('markers');




//const client = new MongoClient(DB_URI);
/*
Possible option
DB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}
*/
//await client.connect();
//export default client.db('portapoo');
