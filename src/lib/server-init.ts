import { scrapeMarketCap } from './marketCap';

let lastMarketCap: number | null = null;
let lastUpdateTime: number = 0;


export function getLastMarketCap() {
  return {
    value: lastMarketCap,
    timestamp: lastUpdateTime
  };
}

// Update market cap every 10 seconds
setInterval(async () => {
  try {
    const cap = await scrapeMarketCap();
    if (cap !== null) {
      lastMarketCap = cap;
      lastUpdateTime = Date.now();
      console.log('Market cap updated:', cap);
    }
  } catch (error) {
    console.error('Failed to update market cap:', error);
  }
}, 30000);
