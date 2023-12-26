import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

const supabaseUrl = 'https://dilhclmxfysnjxbdvcmn.supabase.co';
const supabaseKey = env.PUBLIC_SUPABASE_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseKey);
