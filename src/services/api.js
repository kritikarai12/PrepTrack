const BASE_URL = 'http://localhost:5000/api';

export const registerStudent = async (formData) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return response.json();
};

export const loginStudent = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

export const saveProgress = async (token, section, topicId, status) => {
  const response = await fetch(`${BASE_URL}/progress/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ section, topicId, status })
  });
  return response.json();
};

export const removeProgress = async (token, section, topicId) => {
  const response = await fetch(`${BASE_URL}/progress/remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ section, topicId })
  });
  return response.json();
};

export const getProgress = async (token) => {
  const response = await fetch(`${BASE_URL}/progress/get`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

export const getStats = async (token) => {
  const response = await fetch(`${BASE_URL}/progress/stats`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};
export const updateProfile = async (token, profileData) => {
  const response = await fetch(`${BASE_URL}/auth/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(profileData)
  });
  return response.json();
};