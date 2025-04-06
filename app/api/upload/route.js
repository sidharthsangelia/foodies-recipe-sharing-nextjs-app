// app/api/upload/route.js

export async function POST(req) {
    const formData = await req.formData();
    const title = formData.get("title");
    const image = formData.get("image");
  
    // Debug: log values
    console.log("Title:", title);
    console.log("Image:", image);
  
    // TODO: You can process and save this data as needed (e.g., store it in DB or cloud)
    return new Response(JSON.stringify({ message: "Meal shared successfully!" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  