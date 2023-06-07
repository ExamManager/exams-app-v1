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
      console.log(response.data)
      localStorage.setItem('fullname', response.data[0].full_name);
      localStorage.setItem('profilepic', response.data[0].avatar_url);
      localStorage.setItem('email', response.data[0].email);
      localStorage.setItem('provider', response.data[0].provider);
      sessionStorage.setItem('setupComplete', response.data[0].setup_complete);
      if (response.data[0].username === null) {
        this.setUserName(response.data[0].id);
      }
      return response.data[0];

    },
    async setUserName(userid: string) {
      // Your method logic here
      // create a random username with the layout of user-xxxxxx and make it update the value in the database, if it returns an error, make a loop that keeps trying until it works
      var username = "user-" + Math.floor(Math.random() * 1000000);
      const response = await supabase
        .from('profiles')
        .update({ username: username })
        .eq('id', userid)
      if (response.error) {
        this.setUserName(userid);
      }
    },
    async updateUserMetadata(zip: string, isEnt: boolean, country: string, address1: string, address2: string, schoolName?: string, userid?: string) {
      console.log(userid)
      const response = await supabase
        .from('profiles')
        .update({
          metadata: {
            zip: zip,
            isEnt: isEnt,
            country: country,
            address1: address1,
            address2: address2,
            schoolName: schoolName
          }
        })
        .eq('id', userid)
      
      console.log('response', response)
    },
    async setUserMetadata(
      userid: string,
      data: {
        username: string,
        entSize: string,
        firstName: string,
        lastName: string,
        email: string,
        address: {
          country: string,
          city: string,
          state: string,
          zip: string,
          address1: string,
          address2?: string,
          address3?: string,
        },
      },
      img?: any,
      ) {
      console.log(userid)
      const profilePic = img

      if (!data.address.address2) data.address.address2 = '';
      if (!data.address.address3) data.address.address3 = '';

      const toUpload = {fullData: {data}}

      if (profilePic != null) {
        const fileName: string = `${userid}-${Math.floor(Math.random()*10000)}.png`

        const { profilePicResponse } = await supabase.storage
          .from('avatars')
          .upload(`profile-pictures/${fileName}`, profilePic)

        const imageURL = await supabase.storage
          .from('avatars')
          .getPublicUrl(`profile-pictures/${fileName}`)
        console.log(imageURL) // always log the response to see if there was an error
        toUpload.fullData.avatarURL = imageURL.data.publicUrl
      }

      const response = await supabase
        .from('profiles')
        .update(toUpload)
        .eq('id', userid)
      console.log('response', response)
    },
    // async testingStorageIMG(file: File) {
    //   console.log(file);
    //   const { response, error } = await supabase
    //     .storage
    //     .from('avatars')
    //     .upload('funnytest.png', file)
      
    //   console.log(response, error)
    // }
  }
}