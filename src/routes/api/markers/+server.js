import { json } from '@sveltejs/kit'
import { markers } from "$lib/db"

export async function GET(event) {
  const connection = await client.connect();
  const collection = client.db("sample_airbnb").collection("listingsAndReviews").find();
  console.log(json(collection.toArray()))
  return json(collection)
}

export async function POST({ request, cookies }) {
  try {
	const body = await request.json();
  const result = await markers.insertOne(body);

	return json({ result }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
  }
}
