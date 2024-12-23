interface PumpFunData {
  marketCap: number | null;
}

export async function scrapePumpFun(tokenAddress: string): Promise<PumpFunData | null> {
  try {
    console.log('Scraping pump.fun for address:', tokenAddress);
    
    const response = await fetch(`https://pump.fun/coin/${tokenAddress}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      console.error('Pump.fun response not OK:', response.status);
      return null;
    }

    const html = await response.text();
    console.log('Received HTML length:', html.length);
    
    const marketCapRegex = /usd_market_cap\\":([\d.]+)/;
    const match = html.match(marketCapRegex);
    
    if (match && match[1]) {
      const marketCap = Number(match[1]);
      console.log('Found market cap:', marketCap);
      return { marketCap };
    }
    
    console.log('Market cap not found in HTML');
    return { marketCap: null };

  } catch (error) {
    console.error('Error scraping pump.fun:', error);
    return null;
  }
} 