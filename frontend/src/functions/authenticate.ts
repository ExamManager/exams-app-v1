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
    async checkSession() { // there is already one you can call
      // Your method logic here
      const { data } = await supabase.auth.refreshSession()
      const { session, user } = data
      if (session != null) {
        this.$store.dispatch('updateParam', ['userid', user.id])
        return user;
      } else {
        this.$store.dispatch('updateParam', ['userid', 'null'])
        return false;
      }
    },
    async signin(email: string, password: string) {
      var reqemail = email;
      var reqpassword = password;
      // Your method logic here
      const response = await supabase.auth.signInWithPassword({
        email: reqemail,
        password: reqpassword,
      })
      this.checkSession()
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

      // this.$store.dispatch('updateParam', ['user', 'null'])
      this.checkSession() // that does it aswell
      return response;
    },
    async checkOnRoute() { // Important used for before routing to check if user is logged in
      const response = await supabase.auth.refreshSession()
      if (response.data.session != null) {
        return response.data.session.user.id
      } else {
        return false
      }
    },

    // // Updating Data Functions
    // async getData(userid: string, array: string[]) {
    //   const returnData = {}
    //   console.log(userid, array)
    //   try {
    //     const selectString = array.join(',')
    //     const response = await supabase
    //       .from('profiles')
    //       .select(selectString)
    //       .eq('userid', userid)
    //     return response.data[0]
    //     console.log(response.data[0])
    //   } catch (error) {
    //     console.log(error)
    //     return "null"
    //   }
    //   return returnData
    // },
    // async getMainData(userid: string) {
    //   // grabs all userdata expect for the metadata
    //   try {
    //     const response = await supabase
    //     .from('profiles')
    //     .select("username,setupComplete,fullname,avatarurl,provider,email,plan")
    //     .eq('userid', userid)
    //   return response.data[0];
    //   } catch (error) {
    //     console.log(error)
    //     return "null"
    //   }
    // },
    // async getAllData(userid: string) {
    //   // grabs all userdata including the metadata
    //   try {
    //     const response = await supabase
    //       .from('profiles')
    //       .select("*")
    //       .eq('userid', userid)
    //     return response.data[0];
    //   } catch (error) {
    //     console.log(error)
    //     return "null"
    //   }
    // },
    async onPageLoad() { // done, runs on page load once and updates everything
      const data2 = await supabase.auth.refreshSession()
      // Checks if the user is logged in
      if (data2.data.session != null) {
        // Grabs the userid
        const userid = data2.data.session.user.id
        // Grabs the data from the database
        const { data } = await supabase
          .from('profiles')
          .select()
          .eq('userid', userid)
        // Pushes the data to the store
        this.$store.dispatch('updateParams', {
          userid: userid,
          username: data[0].username,
          setupComplete: data[0].setupComplete,
          fullname: data[0].fullname,
          avatarurl: data[0].avatarurl,
          provider: data[0].provider,
          email: data[0].email,
          plan: data[0].plan,
          metadata: data[0].metadata,
        })
        return data[0]
      } else {
        return false
      }
    },











    // Updating Functions
    async updateUserData(userid: string, toUpdate: object) { // done
      console.log(toUpdate)
      // Pushes the data to the store
      this.$store.dispatch('updateParams', toUpdate)
      // Pushes the data to the database
      const response = await supabase
        .from('profiles')
        .update(toUpdate)
        .eq('userid', userid)
      return response;
    },
    async setUserData(
      userid: string,
      data: {
        enterprise: boolean,
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

      if (userid == null) {
        userid = this.$store.state.userid
      }

      console.log(userid)


      const profilePic = img

      if (!data.address.address2) data.address.address2 = '';
      if (!data.address.address3) data.address.address3 = '';

      const toUpload = {
        username: data.username,
        full_name: `${data.firstName.trim()} ${data.lastName.trim()}`,
        plan: data.entSize,
        metadata: {
          location: {
            country: data.address.country.trim(),
            city: data.address.city.trim(),
            state: data.address.state.trim(),
            zip: data.address.zip.trim(),
            address1: data.address.address1.trim(),
            address2: data.address.address2.trim(),
            address3: data.address.address3.trim(),
          }, 
          name: {
            first: data.firstName.trim(),
            last: data.lastName.trim(),
            full: `${data.firstName.trim()} ${data.lastName.trim()}`
          }
        },
        setup_complete: true,
      }
      //const provider = await this.getData(userid, ['provider'])

      if (profilePic != null) {
        const fileName: string = `${userid}-${Math.floor(Math.random()*10000)}.png`

        const { profilePicResponse } = await supabase.storage
          .from('avatars')
          .upload(`profile-pictures/${fileName}`, profilePic)

        
        const imageURL = await supabase.storage
          .from('avatars') // :)
          .getPublicUrl(`profile-pictures/${fileName}`)
          
        console.log('profilePicResponse', profilePicResponse)

        console.log(imageURL) // always log the response to see if there was an error
        toUpload.avatar_url = imageURL.data.publicUrl
      }

      console.log('toUpload', toUpload)


      const response = await supabase
        .from('profiles')
        .update(toUpload)
        .eq('id', userid)
      console.log('response', response)
    },
    async setUserAvatar(userid: string, img: any) {
      
    },
  },
}