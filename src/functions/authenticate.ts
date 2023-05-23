import { supabase } from '../supabase'

export default {
  methods: {
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
    async checksession() {
      // Your method logic here
      const { data, error } = await supabase.auth.refreshSession()
      const { session, user } = data
      localStorage.setItem('user', JSON.stringify(user));
      return session;

    }
  }
}
// call this method, by importing it where needed and then calling it by using
// const response = this.myMethod(email, password)
