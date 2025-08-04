class ApiClient {
    async fetch(endpoint, options = {}) {
      const { method = "GET", body, headers = {} } = options;
  
      const defaultHeaders = {
        "Content-Type": "application/json",
        ...headers,
      };
  
      const response = await fetch(`/api${endpoint}`, {
        method,
        headers: defaultHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });
  
      if (!response.ok) {
        throw new Error(await response.text());
      }
  
      return response.json();
    }
  
    // ✅ Authentication APIs
    async registerUser(email, password) {
      return this.fetch("/auth/register", {
        method: "POST",
        body: { email, password },
      });
    }
  
    async getUserProfile() {
      return this.fetch("/user");
    }
  
    // ✅ AI Generation APIs
    async generateVideo(prompt, model) {
      return this.fetch("/user/generate/video", {
        method: "POST",
        body: { prompt, model },
      });
    }
  
    async generateAudio(prompt, model) {
      return this.fetch("/user/generate/audio", {
        method: "POST",
        body: { prompt, model },
      });
    }
  
    // ✅ Payment APIs
    async createPayment(plan, amount) {
      return this.fetch("/user/payments/generate", {
        method: "POST",
        body: { plan, amount },
      });
    }
  
    async verifyPayment(orderId, paymentId) {
      return this.fetch("/user/payments/verify", {
        method: "POST",
        body: { orderId, paymentId },
      });
    }
  }
  
  export const apiClient = new ApiClient();
  