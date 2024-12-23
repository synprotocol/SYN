import { TOKEN_ADDRESS } from '@/config';

export async function scrapeMarketCap(tokenAddress: string = TOKEN_ADDRESS): Promise<number | null> {
  if (!tokenAddress) {
    console.error('Token address is required');
    return null;
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/marketcap?address=${tokenAddress}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Market cap response:', data);
    return typeof data.marketCap === 'number' ? data.marketCap : null;
  } catch (error) {
    console.error('Error fetching market cap:', error);
    return null;
  }
} 