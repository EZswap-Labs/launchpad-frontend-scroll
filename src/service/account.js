import { BASE_URL } from '.';

export const signUp = async (params) => {
  try {
    const response = await fetch(`${BASE_URL}userAccount/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const result = await response.json();
    if (result?.success) {
      return result?.data;
    }
    return '';
  } catch (error) {
    console.error('Error:', error);
    return '';
  }
};

export const signIn = async (params) => {
  try {
    const response = await fetch(`${BASE_URL}userAccount/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const result = await response.json();
    if (result?.success) {
      return result?.data;
    }
    return '';
  } catch (error) {
    console.error('Error:', error);
    return '';
  }
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await fetch(`${BASE_URL}launchpad/uploadImg`, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    if (result?.success) {
      return result?.msg;
    }
    return '';
  } catch (error) {
    console.error('Error:', error);
    return '';
  }
};
