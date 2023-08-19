import db from "$lib/db"
export async function GET() {
  console.log("GETTING")
  const markers = await db.collection('markers').find().toArray()
  console.log(markers)
  return {
    status: 200,
    body: { markers }
  }
}