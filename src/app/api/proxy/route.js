export async function GET(req) {
    const videoUrl = req.nextUrl.searchParams.get("url");
    if (!videoUrl) return new Response("Missing video URL", { status: 400 });
  
    try {
        // const decodedUrl = decodeURIComponent(videoUrl);
      const response = await fetch(videoUrl);
      const headers = new Headers(response.headers);
      headers.set("Access-Control-Allow-Origin", "*");
  
      return new Response(response.body, {
        headers,
        status: response.status,
      });
    } catch (error) {
      return new Response("Error fetching video", { status: 500 });
    }
  }
  


// export async function GET(req) {
//     const videoUrl = req.nextUrl.searchParams.get("url");
//     if (!videoUrl) return new Response("Missing video URL", { status: 400 });
  
//     try {
//       // Ensure proper decoding
//       const decodedUrl = decodeURIComponent(videoUrl);
  
//       // Fetch the video with headers
//       const response = await fetch(decodedUrl, {
//         headers: {
//           "User-Agent": req.headers.get("user-agent"),
//         },
//       });
  
//       if (!response.ok) {
//         return new Response("Failed to fetch video", { status: response.status });
//       }
  
//       // Preserve headers (especially Content-Type for video playback)
//       const headers = new Headers(response.headers);
//       headers.set("Access-Control-Allow-Origin", "*");
  
//       return new Response(response.body, {
//         headers,
//         status: response.status,
//       });
//     } catch (error) {
//       console.error("Proxy Error:", error);
//       return new Response("Error fetching video", { status: 500 });
//     }
//   }
  