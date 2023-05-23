import { supabase } from '../supabase'

export default {
  methods: {
    // Authentication Functions
    // only run when called by a method
    async signup(email: string, password: string) {
      var reqemail = email;
      var reqpassword = password;
      // Your method logic here
      const response = await supabase.auth.signUp({
        email: reqemail,
        password: reqpassword,
      })
      console.log('Success');
      return response;
    },
    async signin(email: string, password: string) {
      var reqemail = email;
      var reqpassword = password;
      // Your method logic here
      const response = await supabase.auth.signInWithPassword({
        email: reqemail,
        password: reqpassword,
      })

      return response;
    },
    async signingoogle() {
      // Your method logic here
      const response = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      return response;
    },
    async signout() {
      // Your method logic here
      const response = await supabase.auth.signOut()
      return response;
    },
    // Other Fuctions
    // runs every time the page reloads to check that the user is signed in
    async checksession() {
      // Your method logic here
      const { data, error } = await supabase.auth.refreshSession()
      const { session, user } = data
      localStorage.setItem('user', JSON.stringify(user));
      // returns a true or false value, but also saves the session and whether the user is signed in to local storage
    }
  }
}