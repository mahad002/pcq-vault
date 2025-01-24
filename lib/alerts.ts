import axios from 'axios';

export async function createAlert(userEmail: string, type: string, message: string) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No authentication token found, skipping alert creation');
      return;
    }

    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/activity/alerts`,
      { userEmail, type, message },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    // Log error but don't throw to prevent breaking the main flow
    console.error('Error creating alert:', error);
  }
}

export async function logActivity(email: string, action: string, details: any) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No authentication token found, skipping activity log');
      return;
    }

    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/activity/log`,
      { email, action, details },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    // Log error but don't throw to prevent breaking the main flow
    console.error('Error logging activity:', error);
  }
}