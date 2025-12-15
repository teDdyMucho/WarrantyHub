import { supabase, UserRole } from './supabase'
import bcrypt from 'bcryptjs'

export interface RegisterData {
  email: string
  password: string
  firstName?: string
  lastName?: string
  dealership?: string
  role?: UserRole
}

export interface LoginData {
  email: string
  password: string
}

export const registerUser = async (data: RegisterData) => {
  try {
    // Hash the password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(data.password, saltRounds)

    // Insert user into database
    const { data: user, error } = await supabase
      .from('users')
      .insert([
        {
          email: data.email,
          password_hash: passwordHash,
          first_name: data.firstName,
          last_name: data.lastName,
          dealership: data.dealership,
          role: data.role || 'client'
        }
      ])
      .select()
      .single()

    if (error) {
      throw error
    }

    return { success: true, user, error: null }
  } catch (error: any) {
    return { success: false, user: null, error: error.message }
  }
}

export const loginUser = async (data: LoginData) => {
  try {
    // Get user from database
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', data.email)
      .single()

    if (error || !user) {
      throw new Error('Invalid email or password')
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(data.password, user.password_hash)
    
    if (!isValidPassword) {
      throw new Error('Invalid email or password')
    }

    // Remove password hash from returned user object
    const { password_hash, ...userWithoutPassword } = user

    return { success: true, user: userWithoutPassword, error: null }
  } catch (error: any) {
    return { success: false, user: null, error: error.message }
  }
}
