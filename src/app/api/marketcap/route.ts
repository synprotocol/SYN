import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { scrapePumpFun } from '@/lib/scraper';
import { getLastMarketCap } from '@/lib/server-init';


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json(
      { error: 'Address is required' }, 
      { status: 400 }
    );
  }

  try {
    // First try to get the cached value
    const cachedData = getLastMarketCap();
    if (cachedData.value !== null) {
      return NextResponse.json({
        marketCap: cachedData.value,
        timestamp: new Date(cachedData.timestamp).toISOString()
      });
    }

    // If no cached value, try to fetch new data
    const data = await scrapePumpFun(address);
    
    if (!data || data.marketCap === null) {
  
      return NextResponse.json({ 
        marketCap: 0,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({ 
      marketCap: data.marketCap,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching market cap:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market cap' },
      { status: 500 }
    );
  }
} 