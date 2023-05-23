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
      const response = await supabase.auth.refreshSession()
      // find the user variable in the response
      const user = String(response.data.user);
      if (user === "null") {
        // if the user is not signed in, redirect to the login page
        localStorage.setItem('user', 'null');
        localStorage.setItem('session', 'null');
        return false;
      } else {
        const userid = String(response.data.user?.id);
        localStorage.setItem('user', userid);
        const sessionid = String(response.data.session);
        localStorage.setItem('session', sessionid);
        return true;
      }
    }
  }
}