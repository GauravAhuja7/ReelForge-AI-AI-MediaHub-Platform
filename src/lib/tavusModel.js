// // src/lib/tavusmodel.js

// const replicaIds = ["r79e1c033f", "r4c41453d2", "r8bfa69a42", "rfd03e9ebc"];

// // Helper to get a random replica ID
// const getRandomReplicaId = () => replicaIds[Math.floor(Math.random() * replicaIds.length)];

// export async function generateTavusVideo(script) {
//   try {
//     const replica_id = getRandomReplicaId(); // Select random replica ID

//     const response = await fetch("https://tavusapi.com/v2/videos", {
//         method: "POST",
//         headers: {
//           "x-api-key": process.env.TAVUS_AI_API,
//           "Content-Type": "application/json",
//           "User-Agent": "PostmanRuntime/7.43.0",
//           "Accept": "*/*",
//           "Connection": "keep-alive",
//         },
//         body: JSON.stringify({
//           replica_id,
//           script,
//           video_name: `Generated_Video_${Date.now()}`,
//           fast: true,
//         }),
//       });
      

//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || "Tavus AI Video Generation Failed");

//     console.log("✅ Tavus AI Video Created:", data.hosted_url);
//     return { video_id: data.video_id, hosted_url: data.hosted_url };
//   } catch (error) {
//     console.error("❌ Tavus AI Error:", error.message);
//     return { error: error.message };
//   }
// }


// const replicaIds = ["r79e1c033f", "r4c41453d2", "r8bfa69a42", "rfd03e9ebc"];

// const getRandomReplicaId = () => replicaIds[Math.floor(Math.random() * replicaIds.length)];

// export async function generateTavusVideo(script) {
//   try {
//     const replica_id = getRandomReplicaId();

//     // Create video request
//     const response = await fetch("https://tavusapi.com/v2/videos", {
//       method: "POST",
//       headers: {
//         "x-api-key": process.env.TAVUS_AI_API,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         replica_id,
//         script,
//         video_name: `Generated_Video_${Date.now()}`,
//         fast: true,
//       }),
//     });

//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || "Tavus AI Video Generation Failed");

//     console.log("⏳ Waiting for video to be ready...");
//     console.log(data);

//     return await waitForTavusVideo(data.video_id);
//   } catch (error) {
//     console.error("❌ Tavus AI Error:", error.message);
//     return { error: error.message };
//   }
// }

// Poll video status until it's ready




const replicaIds = ["r79e1c033f", "r4c41453d2", "r8bfa69a42", "rfd03e9ebc"];

const getRandomReplicaId = () => replicaIds[Math.floor(Math.random() * replicaIds.length)];

export async function generateTavusVideo(script) {
  try {
    const replica_id = getRandomReplicaId();

    // Create video request (async)
    const response = await fetch("https://tavusapi.com/v2/videos", {
      method: "POST",
      headers: {
        "x-api-key": process.env.TAVUS_AI_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        replica_id,
        script,
        video_name: `Generated_Video_${Date.now()}`,
        fast: true,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Tavus AI Video Generation Failed");

    console.log("🎥 Video Generation Started. Video ID:", data.video_id);

    return {
      video_id: data.video_id,
      status: "queued",
      hosted_url: data.hosted_url,
      created_at: data.created_at,
    };
  } catch (error) {
    console.error("❌ Tavus AI Error:", error.message);
    return { error: error.message };
  }
}

// async function waitForTavusVideo(video_id, retries = 30, interval = 10000) {
//   try {
//     for (let attempt = 0; attempt < retries; attempt++) {
//       const res = await fetch(`https://tavusapi.com/v2/videos/${video_id}`, {
//     //   const res = await fetch(`https://tavusapi.com/v2/videos/81c42f6d89`, {
//         headers: {
//           "x-api-key": process.env.TAVUS_AI_API,
//         },
//       });
//       const data = await res.json();

//       if (data.status === "ready") {
//         console.log("🎉 Video is ready:", data);
//         return {
//           video_id: data.video_id,
//           hosted_url: data.hosted_url,
//           download_url: data.download_url,
//         };
//       }

//     //   console.log(`⏳ Waiting... Attempt ${attempt + 1}/${retries}`);
//       await new Promise((resolve) => setTimeout(resolve, interval));
    
//     }
//     throw new Error("Video processing timed out.");
//   } catch (error) {
//     console.error("❌ Error checking video status:", error.message);
//     return { error: error.message };
//   }
// }
