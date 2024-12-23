import { supabaseServer } from '@/lib/supabase-server';
import { Message } from '@/types';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const message: Message = await request.json();
    
    if (!message.content || !message.role) {
      return new Response(JSON.stringify({ error: 'Invalid message format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { data, error } = await supabaseServer
      .from('messages')
      .insert([{
        content: message.content,
        role: message.role,
        wallet_address: message.wallet_address,
        timestamp: message.timestamp
      }])
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in messages route:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to save message',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const limit = parseInt(searchParams.get('limit') || '50');

    const query = supabaseServer
      .from('messages')
      .select('*')
      .eq('is_visible', true)
      .order('timestamp', { ascending: true })
      .limit(limit);

    if (address) {
      query.eq('wallet_address', address);
    }

    const { data, error } = await query;

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching messages:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch messages',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 