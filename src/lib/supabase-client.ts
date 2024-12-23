/* eslint-disable */
import { createClient } from '@supabase/supabase-js'

// For client components, we need to use NEXT_PUBLIC_
const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

console.log('Initializing Supabase with URL:', supabaseUrl?.slice(0, 20) + '...');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

let supabase;

try {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    db: {
      schema: 'public'
    }
  });
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  throw error;
}

export { supabase };
  