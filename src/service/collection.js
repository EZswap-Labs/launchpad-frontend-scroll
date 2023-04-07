import { BASE_URL } from '.';

export const queryCollections = async (params) => {
  try {
    const response = await fetch(`${BASE_URL}launchpad/queryList`, {
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

export const createCollection = async (params) => {
  try {
    const response = await fetch(`${BASE_URL}launchpad/addLaunchpad`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const result = await response.json();
    if (result?.success) {
      return 'success';
    }
    return '';
  } catch (error) {
    console.error('Error:', error);
    return '';
  }
};

export const updateCollection = async (params) => {
  try {
    const response = await fetch(`${BASE_URL}launchpad/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const result = await response.json();
    if (result?.success) {
      return 'success';
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
