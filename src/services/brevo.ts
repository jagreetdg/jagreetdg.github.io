interface BrevoContact {
  email: string;
  attributes?: {
    FIRSTNAME?: string;
    LASTNAME?: string;
    [key: string]: any;
  };
  listIds?: number[];
  emailBlacklisted?: boolean;
  smsBlacklisted?: boolean;
  updateEnabled?: boolean;
}

interface BrevoResponse {
  id?: number;
  message?: string;
  code?: string;
}

// Error types for internationalization
export type ErrorType = 
  | 'invalidEmail'
  | 'networkError'
  | 'adBlockerError'
  | 'subscriptionError'
  | 'updateError'
  | 'genericError';

interface ServiceResult {
  success: boolean;
  error?: string;
  errorType?: ErrorType;
}

class BrevoService {
  private apiKey: string;
  private baseUrl = 'https://api.brevo.com/v3';
  private listId: number;
  private useBackendProxy: boolean;
  private backendUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_BREVO_API_KEY || '';
    this.listId = parseInt(import.meta.env.VITE_BREVO_LIST_ID || '0');
    this.useBackendProxy = import.meta.env.VITE_USE_BACKEND_PROXY === 'true';
    this.backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    
    if (!this.apiKey) {
      console.warn('Brevo API key not found. Email subscriptions will be simulated.');
    }
    
    if (!this.listId) {
      console.warn('Brevo List ID not found. Emails will be added without list assignment.');
    }
  }

  async addContact(email: string, attributes?: { [key: string]: any }): Promise<ServiceResult> {
    // If no API key, simulate success (for development)
    if (!this.apiKey) {
      console.log('Simulated Brevo subscription for:', email);
      console.log('No API key found - simulating successful subscription');
      
      // Brief delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Simulation completed successfully');
      return { success: true };
    }

    try {
      console.log('Attempting to add contact to Brevo:', email);
      const contact: BrevoContact = {
        email,
        attributes: attributes || {},
        listIds: this.listId ? [this.listId] : undefined,
        updateEnabled: true, // Update contact if already exists
      };

      console.log('Sending request to Brevo with data:', contact);

      // Use backend proxy if configured, otherwise use direct API
      const endpoint = this.useBackendProxy 
        ? `${this.backendUrl}/api/waitlist/subscribe` // Backend proxy endpoint
        : `${this.baseUrl}/contacts`;

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      };

      // Add API key to headers only for direct API calls
      if (!this.useBackendProxy) {
        requestOptions.headers = {
          ...requestOptions.headers,
          'api-key': this.apiKey,
        };
      }

      const response = await fetch(endpoint, requestOptions);

      const data: BrevoResponse = await response.json();
      console.log('Brevo API response:', { status: response.status, data });

      if (response.ok) {
        console.log('Successfully added contact to Brevo:', email);
        return { success: true };
      } else {
        // Handle specific Brevo error codes
        if (data.code === 'duplicate_parameter') {
          // Contact already exists, try to update
          console.log('Contact already exists, trying to update');
          return await this.updateContact(email, attributes);
        }
        
        console.error('Brevo API error:', data);
        return { 
          success: false, 
          error: data.message || 'Failed to subscribe. Please try again.',
          errorType: 'subscriptionError'
        };
      }
    } catch (error) {
      console.error('Network error details:', error);
      
      // Check if it's an ad blocker error
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        return { 
          success: false, 
          error: 'Request blocked by ad blocker. Please disable your ad blocker for this site or contact support.',
          errorType: 'adBlockerError'
        };
      }
      
      return { 
        success: false, 
        error: 'Network error. Please check your connection and try again.',
        errorType: 'networkError'
      };
    }
  }

  private async updateContact(email: string, attributes?: { [key: string]: any }): Promise<ServiceResult> {
    try {
      const contact: Partial<BrevoContact> = {
        attributes: attributes || {},
        listIds: this.listId ? [this.listId] : undefined,
      };

      const endpoint = this.useBackendProxy 
        ? `${this.backendUrl}/api/waitlist/update/${encodeURIComponent(email)}`
        : `${this.baseUrl}/contacts/${encodeURIComponent(email)}`;

      const requestOptions: RequestInit = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      };

      // Add API key to headers only for direct API calls
      if (!this.useBackendProxy) {
        requestOptions.headers = {
          ...requestOptions.headers,
          'api-key': this.apiKey,
        };
      }

      const response = await fetch(endpoint, requestOptions);

      if (response.ok) {
        console.log('Successfully updated contact in Brevo:', email);
        return { success: true };
      } else {
        const data: BrevoResponse = await response.json();
        console.error('Brevo update error:', data);
        return { 
          success: false, 
          error: data.message || 'Failed to update subscription. Please try again.',
          errorType: 'updateError'
        };
      }
    } catch (error) {
      console.error('Update error:', error);
      return { 
        success: false, 
        error: 'Failed to update subscription. Please try again.',
        errorType: 'updateError'
      };
    }
  }

  // Method to validate email format
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Public method with validation
  async subscribeToWaitlist(email: string): Promise<ServiceResult> {
    console.log('subscribeToWaitlist called with email:', email);
    console.log('API Key available:', !!this.apiKey);
    console.log('List ID available:', this.listId);
    console.log('Using backend proxy:', this.useBackendProxy);
    
    if (!this.isValidEmail(email)) {
      console.log('Invalid email format');
      return { 
        success: false, 
        error: 'Please enter a valid email address.',
        errorType: 'invalidEmail'
      };
    }

    // Add some metadata about the signup
    const attributes = {
      SOURCE: 'Ripply Waitlist',
      SIGNUP_DATE: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      SIGNUP_TIME: new Date().toISOString(),
    };

    console.log('Calling addContact with attributes:', attributes);
    const result = await this.addContact(email, attributes);
    console.log('addContact result:', result);
    return result;
  }
}

// Export singleton instance
export const brevoService = new BrevoService();

// Export for easier testing
export { BrevoService }; 