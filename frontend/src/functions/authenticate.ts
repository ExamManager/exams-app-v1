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
    async checkStatus() {
      // checks if user is logged in by refreshing the session
      const response = await supabase.auth.refreshSession()
      if (response.data.session != null) {
        return response.data.session.user.id
      } else {
        return false
      }
    },
    async getData(userid: string, array: string[]) {
      const returnData = {}
      try {
        const selectString = array.join(',')
        const response = await supabase
          .from('profiles')
          .select(selectString)
          .eq('id', userid)
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
        .select("username,setup_complete,full_name,avatar_url,provider,email,plan")
        .eq('id', userid)
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
          .eq('id', userid)
        return response.data[0];
      } catch (error) {
        console.log(error)
        return "null"
      }
    },
    // all for you <3 but fix them
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
      console.log(userid)

      const plans = [
        { 
          id: 1, 
          title: "Free", 
          description: "For personal use only", 
          users: "Free" 
        },
        {
          id: 2,
          title: "Basic",
          description: "For schools with less than 200 students",
          users: "$9.99",
        },
        {
          id: 3,
          title: "Pro",
          description: "For schools with less than 500 students",
          users: "$19.99",
        },
        {
          id: 4,
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
        fullName: `${data.firstName.trim()} ${data.lastName.trim()}`,
        provider: "",
        email: data.email,
        plan: plans[parseInt(data.entSize)].id,
        metadata: {
          address: data.address, 
          name: {
            first: data.firstName.trim(),
            last: data.lastName.trim(),
            full: `${data.firstName.trim()} ${data.lastName.trim()}`
          }
        },
      }

      if (profilePic != null) {
        const fileName: string = `${userid}-${Math.floor(Math.random()*10000)}.png`

        const { profilePicResponse } = await supabase.storage
          .from('avatars')
          .upload(`profile-pictures/${fileName}`, profilePic)

        const imageURL = await supabase.storage
          .from('avatars') // :)
          .getPublicUrl(`profile-pictures/${fileName}`)
        console.log(imageURL) // always log the response to see if there was an error
        toUpload.avatarURL = imageURL.data.publicUrl
      }

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