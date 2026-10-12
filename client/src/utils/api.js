import { siteConfig } from '../config/siteConfig';

export async function submitEnquiry(data) {
  try {
    const response = await fetch(`${siteConfig.apiUrl}/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('API server returned an invalid response (HTML instead of JSON). The backend API is not connected or VITE_API_URL is missing.');
    }

    const result = await response.json();

    if (!response.ok) {
      const errorMsg = result.message || (result.errors && result.errors.join('. ')) || 'Failed to submit enquiry. Please make sure all details are correct and try again.';
      throw new Error(errorMsg);
    }

    return result;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to the server. Please ensure the backend is running or contact us via WhatsApp.');
    }
    throw error;
  }
}

export async function fetchEnquiries() {
  try {
    const response = await fetch(`${siteConfig.apiUrl}/enquiries`);

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('API server returned an invalid response (HTML instead of JSON). The backend API is not connected or VITE_API_URL is missing.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch enquiries from server');
    }
    const result = await response.json();
    return result.data?.enquiries || [];
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    throw error;
  }
}
