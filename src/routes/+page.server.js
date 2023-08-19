import { markers } from "$lib/db"
import { json } from '@sveltejs/kit'

export const load = async () => {
  try {
    // TODO: limit by proximity to user
    const data = await markers.find().toArray();
    const arr = JSON.parse(JSON.stringify(data));
    return {
      body: arr
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: json({ error: 'Internal server error' }),
    };
  }
}
