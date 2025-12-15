import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type UserRole = 'client' | 'admin'

export interface User {
  id: string
  email: string
  password_hash: string
  first_name?: string
  last_name?: string
  dealership?: string
  role: UserRole
  created_at: string
  updated_at: string
}
