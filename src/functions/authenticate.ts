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
      await supabase.from('plans').insert({plan: 0 })
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
      this.checksession()
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
      localStorage.setItem('user', 'null');
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
        return false;
      } else {
        const userid = String(response.data.user?.id);
        localStorage.setItem('user', userid);
        // check if the user is signed in using google, and if so, grab the name and profile picture link
        if (response.data.user?.app_metadata?.provider === "google") {
          console.log("google")
          const username = String(response.data.user?.user_metadata?.full_name);
          const userpicture = String(response.data.user?.user_metadata?.avatar_url);
          localStorage.setItem('fullname', username);
          localStorage.setItem('profilepic', userpicture);
        } else {
          // grab the users email and make the name the part before the @ symbol
          console.log("not google")
          var username = String(response.data.user?.email);
          var username = username.split("@")[0];
          localStorage.setItem('fullname', username);
          localStorage.setItem('profilepic', 'null');
        }
        return true;
      }
    },
    async getUserData() {
      // Your method logic here
      const response = await supabase.auth.getUser();
      return response;

    }
  }
}