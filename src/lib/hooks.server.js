import { start_mongo } from '$lib/db.js';

start_mongo().then(() => {
    console.log("Connection successful");
}).catch(e => console.error(e));