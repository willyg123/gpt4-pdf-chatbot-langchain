import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'

import {
  // Import predefined theme
    ThemeSupa,
} from '@supabase/auth-ui-shared'

export default function login () {
    return (
        <div >
            <h1>Login</h1>
            <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                />
        </div>
        
    )
}
const supabase = createClient(
    'https://ipoefxhmwktcvsptpvjc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlwb2VmeGhtd2t0Y3ZzcHRwdmpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyNjc3OTAsImV4cCI6MTk5ODg0Mzc5MH0.oFD6hae0mqbGX3Fzh4lzLvKjji8B4SVT09yRJ03M4jM'

)


async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'example@email.com',
      password: 'example-password',
    })
  }