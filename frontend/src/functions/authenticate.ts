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
      this.$store.dispatch('updateParam', ['user', user.id])
      return user;
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
      this.checkSession()
      return response;
    },
    async signout() {
      // Your method logic here
      const response = await supabase.auth.signOut()

      // this.$store.dispatch('updateParam', ['user', 'null'])
      this.checkSession() // that does it aswell
      return response;
    },
    async checkStatus() { // Important used for before routing to check if user is logged in
      const response = await supabase.auth.refreshSession()
      if (response.data.session != null) {
        return response.data.session.user.id
      } else {
        return false
      }
    },

    // Updating Data Functions
    async getData(userid: string, array: string[]) {
      const returnData = {}
      console.log(userid, array)
      try {
        const selectString = array.join(',')
        const response = await supabase
          .from('profiles')
          .select(selectString)
          .eq('userId', userid)
        return response.data[0]
        console.log(response.data[0])
      } catch (error) {
        console.log(error)
        return "null"
      }
      return returnData
    },
    async getMainData(userid: string) {
      // grabs all userdata expect for the metadata
      try {
        const response = await supabase
        .from('profiles')
        .select("username,setupComplete,fullName,avatarUrl,provider,email,plan")
        .eq('userId', userid)
      return response.data[0];
      } catch (error) {
        console.log(error)
        return "null"
      }
    },
    async getAllData(userid: string) {
      // grabs all userdata including the metadata
      try {
        const response = await supabase
          .from('profiles')
          .select("*")
          .eq('userId', userid)
        return response.data[0];
      } catch (error) {
        console.log(error)
        return "null"
      }
    },
    async updateData() { // done, runs on page load once and updates everything
      const data2 = await supabase.auth.refreshSession()
      console.log(data2)
      const userid = data2.data.user.id
      console.log(userid)

      const { data, error } = await supabase
          .from('profiles')
          .select()
          .eq('userId', userid)
      
      this.$store.dispatch('updateParams', {
        userId: userid,
        username: data[0].username,
        setupComplete: data[0].setupComplete,
        fullName: data[0].fullName,
        avatarUrl: data[0].avatarUrl,
        provider: data[0].provider,
        email: data[0].email,
        plan: data[0].plan,
        metadata: data[0].metadata,
      })
    },











    // Updating Functions
    async updateUserData(userid: string, toUpdate: object) {
      console.log(userid)

      function getUpdatedObject(objFull, objUpdates) {
        for (var key in objUpdates) {
          if (typeof objUpdates[key] ==  "object") {
            const objOriginal = objFull[key]
            if (objFull[key]) {
              const objUpdated = getUpdatedObject(objOriginal, objUpdates[key])
              objFull[key] = objUpdated
            }
            else objFull[key] = objUpdates[key]
          }
          else {
            objFull[key] = objUpdates[key]
          }
        }
        return objFull
      }

      if (toUpdate.metadata) {
        const updates = toUpdate.metadata

        const response = await supabase
          .from('profiles')
          .select('metadata')
          .eq('id', userid)
        const metadata = response.data[0].metadata
        const newMetadata = getUpdatedObject(metadata, updates)
        toUpdate.metadata = newMetadata        
      }
      
      const response = await supabase
        .from('profiles')
        .update(toUpdate)
        .eq('id', userid)
      
      console.log('response', response)
    },
    async setUserData(
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

      if (userid == null) {
        userid = this.$store.state.userId
      }

      console.log(userid)

      const plans = [
        { 
          id: 0, 
          title: "Free", 
          description: "For personal use only", 
          users: "Free" 
        },
        {
          id: 1,
          title: "Basic",
          description: "For schools with less than 200 students",
          users: "$9.99",
        },
        {
          id: 2,
          title: "Pro",
          description: "For schools with less than 500 students",
          users: "$19.99",
        },
        {
          id: 3,
          title: "Enterprise",
          description: "For schools with less than 750 students",
          users: "$39.99",
        },
      ];

      const profilePic = img

      if (!data.address.address2) data.address.address2 = '';
      if (!data.address.address3) data.address.address3 = '';

      const toUpload = {
        username: data.username,
        full_name: `${data.firstName.trim()} ${data.lastName.trim()}`,
        plan: data.entSize,
        metadata: {
          address: {
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
      const provider = await this.getData(userid, ['provider'])

      if (profilePic != null) {
        const fileName: string = `${userid}-${Math.floor(Math.random()*10000)}.png`

        const { profilePicResponse } = await supabase.storage
          .from('avatars')
          .upload(`profile-pictures/${fileName}`, profilePic)

        const imageURL = await supabase.storage
          .from('avatars') // :)
          .getPublicUrl(`profile-pictures/${fileName}`)
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