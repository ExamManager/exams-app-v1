import { supabase } from '../supabase'

export default {
  data() {
    return {
      userid: "null",
    }
  },
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
      // await supabase.from('plans').insert({plan: 0 })
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
      localStorage.clear();
      localStorage.setItem('user', 'null');
      return response;
    },
    async checksession() { // returns userdata if the user is signed in, and false if the user is not signed in
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
        localStorage.setItem('fullname', response.data.user?.user_metadata.full_name);
        localStorage.setItem('profilepic', response.data.user?.user_metadata.avatar_url);
        localStorage.setItem('user', userid);
        // check if the user is signed in using google, and if so, grab the name and profile picture link
        return this.getUserData(userid);
      }
    },
    async getUserData(userid?: string) { 
      // Your method logic here
      // if userid is not provided, use the userid from the local storage
      const response = await supabase
        .from('profiles')
        .select()
        .eq('id', userid || localStorage.getItem('user'))
      localStorage.setItem('fullname', response.data[0].full_name);
      localStorage.setItem('profilepic', response.data[0].avatar_url);
      localStorage.setItem('email', response.data[0].email);
      localStorage.setItem('provider', response.data[0].provider);
      return response.data[0];

    },
  }
}