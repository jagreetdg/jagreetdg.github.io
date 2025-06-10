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
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    }

    try {
      const contact: BrevoContact = {
        email,
        attributes: attributes || {},
        listIds: this.listId ? [this.listId] : undefined,
        updateEnabled: true, // Update contact if already exists
      };

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

      if (response.ok) {
        console.log('Successfully added contact to Brevo:', email);
        return { success: true };
      } else {
        // Handle specific Brevo error codes
        if (data.code === 'duplicate_parameter') {
          // Contact already exists, try to update
          return await this.updateContact(email, attributes);
        }
        
        console.error('Brevo API error:', data);
        return { 
          success: false, 
          error: data.message || 'Failed to subscribe. Please try again.' 
        };
      }
    } catch (error) {
      console.error('Network error:', error);
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
    if (!this.isValidEmail(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    // Add some metadata about the signup
    const attributes = {
      SOURCE: 'Ripply Waitlist',
      SIGNUP_DATE: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      SIGNUP_TIME: new Date().toISOString(),
    };

    return await this.addContact(email, attributes);
  }
}

// Export singleton instance
export const brevoService = new BrevoService();

// Export for easier testing
export { BrevoService }; 