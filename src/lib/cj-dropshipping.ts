export interface CJProduct {
  pid: string;
  productName: string;
  productSku: string;
  productImage: string;
  productPrice: string;
}

export async function fetchCJProducts(keyword: string = ''): Promise<CJProduct[]> {
  const apiKey = process.env.CJ_DROPSHIPPING_API_KEY;
  if (!apiKey) {
    console.warn('CJ_DROPSHIPPING_API_KEY is not set');
    return [];
  }

  try {
    const response = await fetch(
      `https://developers.cjdropshipping.com/api2.0/v1/product/list?pageNum=1&pageSize=20&keywords=${encodeURIComponent(keyword)}`,
      {
        headers: {
          'CJ-Access-Token': apiKey,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`CJ API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.data?.list || [];
  } catch (error) {
    console.error('Error fetching products from CJ Dropshipping:', error);
    return [];
  }
}