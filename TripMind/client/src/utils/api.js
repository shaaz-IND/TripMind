const API_BASE = '/api';

export const api = {
  async planTrip(query) {
    const response = await fetch(`${API_BASE}/plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    return response.json();
  },

  async getHistory() {
    const response = await fetch(`${API_BASE}/history`);
    return response.json();
  },

  async resetMemory() {
    const response = await fetch(`${API_BASE}/reset`, { method: 'POST' });
    return response.json();
  },

  async getPreferences() {
    const response = await fetch(`${API_BASE}/preferences`);
    return response.json();
  },

  async updatePreferences(preferences) {
    const response = await fetch(`${API_BASE}/preferences/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferences }),
    });
    return response.json();
  },

  async getBookings() {
    const response = await fetch(`${API_BASE}/bookings`);
    return response.json();
  },

  async createBooking(booking) {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });
    return response.json();
  },

  async health() {
    const response = await fetch(`${API_BASE}/../health`);
    return response.json();
  },
};
