import axios from "axios";

const AI_MODELS = {
  textToVideo: {
    RunwayML: {
      url: process.env.RUNWAYML_API_URL,  // e.g., "https://api.runwayml.com/v1/your-endpoint"
      key: process.env.RUNWAYML_API_KEY,
    },
    Vadoo:{
      key: process.env.VADOO_AI_API
      
    },
    Pictory: {
      url: process.env.PICTORY_API_URL,
      key: process.env.PICTORY_API_KEY,
    },
    Synthesia: {
      url: process.env.SYNTHESIA_API_URL,
      key: process.env.SYNTHESIA_API_KEY,
    },
  },
  textToAudio: {
    GoogleTTS: {
      url: process.env.GOOGLE_TTS_API_URL,
      key: process.env.GOOGLE_TTS_API_KEY,
    },
    IBMWatson: {
      url: process.env.IBM_WATSON_TTS_API_URL,
      key: process.env.IBM_WATSON_TTS_API_KEY,
    },
    AmazonPolly: {
      url: process.env.AMAZON_POLLY_API_URL,
      key: process.env.AMAZON_POLLY_API_KEY,
    },
    PlayHT: {
      url: process.env.PLAY_HT_API_URL,
      key: process.env.PLAY_HT_API_KEY,
    },
    CoquiTTS: {
      url: process.env.COQUI_TTS_API_URL || "http://localhost:5002/api/tts",
      key: null,
    },
  },
};

/**
 * Calls the selected AI Model API for text-to-audio or text-to-video conversion.
 * @param {string} model - The AI model name (e.g., "RunwayML", "GoogleTTS", "CoquiTTS").
 * @param {string} prompt - The user-provided text prompt.
 * @param {string} type - Either "textToVideo" or "textToAudio".
 * @returns {string} - The generated media URL.
 */
export async function callAIModel(model, prompt, type) {
  if (!AI_MODELS[type] || !AI_MODELS[type][model]) {
    throw new Error("Invalid AI Model selected.");
  }

  const { url: apiUrl, key: apiKey } = AI_MODELS[type][model];

  if (!apiUrl) {
    throw new Error(`Missing API URL for ${model}`);
  }
  if (!apiKey) {
    throw new Error(`Missing API key for ${model}`);
  }

  try {
    console.log(`📡 Calling ${model} API with prompt:`, prompt);

    const headers = {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
    };

    const response = await axios.post(apiUrl, { prompt }, { headers });

    console.log(`✅ ${model} Initial Response:`, response.data);

    if (type === "textToVideo" && model === "RunwayML") {
      const taskId = response.data.id;
      return await pollRunwayMLForVideo(taskId);
    }

    if (response.data.output && response.data.output.length > 0) {
      return response.data.output[0];
    } else {
      throw new Error(`Invalid response from ${model} API.`);
    }
  } catch (error) {
    if (error.response) {
      console.error(`❌ API Error: ${model}`, error.response.status, error.response.data);
    } else {
      console.error(`❌ Error calling ${model}:`, error.message);
    }
    throw new Error(`Failed to generate media using ${model}`);
  }
}

/**
 * Polls the RunwayML API until the video generation task is complete.
 * @param {string} taskId - The ID of the video generation task.
 * @returns {string} - The generated video URL.
 */
async function pollRunwayMLForVideo(taskId) {
  const apiUrl = `${process.env.RUNWAYML_API_URL}/tasks/${taskId}`;
  const headers = {
    "X-API-Key": process.env.RUNWAYML_API_KEY,
    "Content-Type": "application/json",
  };

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      const response = await axios.get(apiUrl, { headers });

      if (response.data.status === "SUCCEEDED" && response.data.output.length > 0) {
        console.log("✅ Video generated successfully:", response.data.output[0]);
        return response.data.output[0];
      }

      console.log(`⏳ Video still processing... Attempt ${attempt + 1}/10`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
      console.error("❌ Error polling RunwayML:", error.message);
    }
  }

  throw new Error("❌ RunwayML video generation timed out.");
}
