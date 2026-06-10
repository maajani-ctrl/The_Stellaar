import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // Return a mock if credentials are missing to avoid runtime crashes
    // Silence warning in dev unless we are actually trying to use auth
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithOAuth: async () => { console.warn('Supabase not configured') },
        signOut: async () => {},
        getSession: async () => ({ data: { session: null }, error: null }),
      }
    } as ReturnType<typeof createBrowserClient>
  }

  return createBrowserClient(url, key)
}
