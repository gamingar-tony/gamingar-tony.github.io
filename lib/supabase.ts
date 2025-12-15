import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://webubksfkcytbczenfxpy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidWJrc2ZrY3l0YmN6ZW5meHB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MzE5MjMsImV4cCI6MjA4MTQwNzkyM30.x0qHGf05VL0rORAXEyF0EudWwhftF3XszSB7aWyMaG0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: number;
  title: string;
  description: string;
  day_number?: number;
  project_date?: string;
  tech_stack: string[];
  live_link?: string;
  github_link?: string;
  image_url?: string;
  created_at: string;
}
