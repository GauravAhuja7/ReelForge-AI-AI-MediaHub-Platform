/**
 * API Client for FeeltoReel AI Frontend
 * Centralized HTTP client for making requests to the backend API
 * Handles JSON serialization, error handling, and provides type-safe methods
 */
class ApiClient {
  /**
   * Generic fetch method for making HTTP requests to the API
   * @param {string} endpoint - API endpoint path (without /api prefix)
   * @param {Object} options - Request options
   * @param {string} options.method - HTTP method (GET, POST, etc.)
   * @param {Object} options.body - Request body data
   * @param {Object} options.headers - Additional headers
   * @returns {Promise<Object>} - Parsed JSON response
   * @throws {Error} - When request fails or returns error status
   */
  async fetch(endpoint, options = {}) {
    const { method = "GET", body, headers = {} } = options;

    // Set default headers for all requests
    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    try {
      // Make the HTTP request
      const response = await fetch(`/api${endpoint}`, {
        method,
        headers: defaultHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      // Handle error responses
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP ${response.status}: ${response.statusText}`);
      }

      // Return parsed JSON response
      return response.json();
    } catch (error) {
      // Re-throw with additional context for network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to server');
      }
      throw error;
    }
  }

  // ==========================================
  // Authentication API Methods
  // ==========================================

  /**
   * Register a new user account
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise<Object>} - Registration response
   */
  async registerUser(email, password) {
    return this.fetch("/auth/register", {
      method: "POST",
      body: { email, password },
    });
  }

  /**
   * Get current user's profile information
   * @returns {Promise<Object>} - User profile data
   */
  async getUserProfile() {
    return this.fetch("/user");
  }

  // ==========================================
  // AI Generation API Methods
  // ==========================================

  /**
   * Generate a video from text prompt using AI
   * @param {string} prompt - Text prompt for video generation
   * @param {string} model - AI model to use for generation
   * @returns {Promise<Object>} - Video generation response
   */
  async generateVideo(prompt, model) {
    return this.fetch("/user/generate/video", {
      method: "POST",
      body: { prompt, model },
    });
  }

  /**
   * Generate audio from text prompt using AI
   * @param {string} prompt - Text prompt for audio generation
   * @param {string} model - AI model to use for generation
   * @returns {Promise<Object>} - Audio generation response
   */
  async generateAudio(prompt, model) {
    return this.fetch("/user/generate/audio", {
      method: "POST",
      body: { prompt, model },
    });
  }

  // ==========================================
  // Payment API Methods
  // ==========================================

  /**
   * Create a new payment order for subscription
   * @param {string} plan - Subscription plan name
   * @param {number} amount - Payment amount
   * @returns {Promise<Object>} - Payment order details
   */
  async createPayment(plan, amount) {
    return this.fetch("/user/payments/generate", {
      method: "POST",
      body: { plan, amount },
    });
  }

  /**
   * Verify a completed payment transaction
   * @param {string} orderId - Payment order ID
   * @param {string} paymentId - Payment transaction ID
   * @returns {Promise<Object>} - Payment verification response
   */
  async verifyPayment(orderId, paymentId) {
    return this.fetch("/user/payments/verify", {
      method: "POST",
      body: { orderId, paymentId },
    });
  }
}

// Export singleton instance of the API client
export const apiClient = new ApiClient();
  