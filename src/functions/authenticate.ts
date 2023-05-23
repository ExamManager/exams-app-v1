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
      }
  }
}
// call this method, by importing it where needed and then calling it by using 
// const response = this.myMethod(email, password)
  