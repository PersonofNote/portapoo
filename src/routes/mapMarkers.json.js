import { MongoClient } from "mongodb"
import { DB_URI } from '$env/static/private';

const dbName = 'portapoo';
const collectionName = 'markers';

export async function get() {
  const client = new MongoClient(DB_URI, { useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const documents = await collection.find({}).toArray();
    return {
      status: 200,
      body: documents
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      status: 500,
      body: { error: 'An error occurred while fetching data' }
    };
  } finally {
    client.close();
  }
}
