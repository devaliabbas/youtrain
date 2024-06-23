import { useEffect, useState } from "react"
import { supabase } from "../supabase"
import { User } from "@supabase/supabase-js"

interface AuthState {
  user: User | null
  loading: boolean
}

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error("Error fetching session:", error.message)
        setLoading(false)
        return
      }
      setUser(data.session?.user ?? null)
      setLoading(false)
    }

    fetchUser()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return { user, loading }
}
