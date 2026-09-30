import axios from 'axios';

const CJ_BASE_URL = 'https://developers.cjdropshipping.com/api2.0/v1';

export async function getCJAccessToken() {
  try {
    const response = await axios.post(\\/authentication/getAccessToken\, {
      email: process.env.CJ_DROPSHIPPING_EMAIL,
      password: process.env.CJ_DROPSHIPPING_API_KEY,
    });
    return response.data?.data?.accessToken || null;
  } catch (error) {
    console.error('Failed to get CJ access token:', error);
    return null;
  }
}

export async function fetchCJProducts(keywords = '', pageNum = 1, pageSize = 20) {
  const token = await getCJAccessToken();
  if (!token) throw new Error('CJ Authentication failed');

  const response = await axios.get(\\/product/list\, {
    headers: { 'CJ-Access-Token': token },
    params: { keyWord: keywords, pageNum, pageSize },
  });

  return response.data?.data?.list || [];
}

