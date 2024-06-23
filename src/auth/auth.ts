import { supabase } from "../supabase"

export const signUp = async (
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  dob: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    
    throw new Error(error.message)
  }

  if (data.user) {
    const { error: insertError } = await supabase
      .from("users")
      .insert([
        { userID: data.user.id, firstname: firstname, lastname: lastname, dob: dob },
      ])

    if (insertError) {
      throw new Error(insertError.message)
    }
  }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data.user
}
