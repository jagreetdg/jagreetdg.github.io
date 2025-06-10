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

class BrevoService {
  private apiKey: string;
  private baseUrl = 'https://api.brevo.com/v3';
  private listId: number;

  constructor() {
    this.apiKey = import.meta.env.VITE_BREVO_API_KEY || '';
    this.listId = parseInt(import.meta.env.VITE_BREVO_LIST_ID || '0');
    
    if (!this.apiKey) {
      console.warn('Brevo API key not found. Email subscriptions will be simulated.');
    }
    
    if (!this.listId) {
      console.warn('Brevo List ID not found. Emails will be added without list assignment.');
    }
  }

  async addContact(email: string, attributes?: { [key: string]: any }): Promise<{ success: boolean; error?: string }> {
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

      const response = await fetch(`${this.baseUrl}/contacts`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        body: JSON.stringify(contact),
      });

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
          error: data.message || 'Failed to subscribe. Please try again.' 
        };
      }
    } catch (error) {
      console.error('Network error details:', error);
      return { 
        success: false, 
        error: 'Network error. Please check your connection and try again.' 
      };
    }
  }

  private async updateContact(email: string, attributes?: { [key: string]: any }): Promise<{ success: boolean; error?: string }> {
    try {
      const contact: Partial<BrevoContact> = {
        attributes: attributes || {},
        listIds: this.listId ? [this.listId] : undefined,
      };

      const response = await fetch(`${this.baseUrl}/contacts/${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        console.log('Successfully updated contact in Brevo:', email);
        return { success: true };
      } else {
        const data: BrevoResponse = await response.json();
        console.error('Brevo update error:', data);
        return { 
          success: false, 
          error: data.message || 'Failed to update subscription. Please try again.' 
        };
      }
    } catch (error) {
      console.error('Update error:', error);
      return { 
        success: false, 
        error: 'Failed to update subscription. Please try again.' 
      };
    }
  }

  // Method to validate email format
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Public method with validation
  async subscribeToWaitlist(email: string): Promise<{ success: boolean; error?: string }> {
    console.log('subscribeToWaitlist called with email:', email);
    console.log('API Key available:', !!this.apiKey);
    console.log('List ID available:', this.listId);
    
    if (!this.isValidEmail(email)) {
      console.log('Invalid email format');
      return { success: false, error: 'Please enter a valid email address.' };
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