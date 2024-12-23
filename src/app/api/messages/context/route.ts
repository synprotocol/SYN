import { supabaseServer } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5');

    const { data, error } = await supabaseServer
      .from('messages')
      .select('role, content')
      .eq('is_visible', true)
      .order('timestamp', { ascending: true })
      .limit(limit);

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching conversation context:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversation context' },
      { status: 500 }
    );
  }
} 