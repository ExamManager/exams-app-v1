import { supabase } from '../supabase'
import { supabaseServiceRole } from '../supabase'

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
      // clear local storage
      localStorage.clear()
      this.$store.dispatch('updateParam', ['user', 'null'])
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
        username: string,
        plan: number,
        fullname: string,
        metadata: {
          enterprise: boolean,
          location: {
            country: string,
            state: string,
            city: string,
            zip: string,
            address1: string,
            address2?: string,
            address3?: string,
          }
        },
      },
      img?: any,
      ) {

      if (userid == null) {
        userid = this.$store.state.userid
      }

      console.log(userid)


      const profilePic = img

      if (!data.metadata.location.address2) data.metadata.location.address2 = '';
      if (!data.metadata.location.address3) data.metadata.location.address3 = '';

      const toUpload = {
        username: data.username,
        fullname: data.fullname,
        plan: data.plan,
        metadata: {
          location: {
            country: data.metadata.location.country.trim(),
            state: data.metadata.location.state.trim(),
            zip: data.metadata.location.zip.trim(),
            city: data.metadata.location.city.trim(),
            address1: data.metadata.location.address1.trim(),
            address2: data.metadata.location.address2.trim(),
            address3: data.metadata.location.address3.trim(),
          },
        },
        setupComplete: true,
      }
      //const provider = await this.getData(userid, ['provider'])

      if (profilePic != null) {
        const fileName: string = `${userid}-${Math.floor(Math.random()*10000)}.${profilePic.name.split('.')[1]}`

        const { profilePicResponse } = await supabase.storage
          .from('avatars')
          .upload(`${fileName}`, profilePic)

        
        const imageURL = await supabase.storage
          .from('avatars') // :)
          .getPublicUrl(`${fileName}`)
          
        console.log('profilePicResponse', profilePicResponse)

        console.log(imageURL) // always log the response to see if there was an error
        toUpload.avatarurl = imageURL.data.publicUrl
        toUpload.avatar_filename = fileName
      }

      console.log('toUpload', toUpload)

      const response = await supabase
        .from('profiles')
        .update(toUpload)
        .eq('userid', userid)
      console.log('response', response)
      
      return response;
    },
    async updateAvatar(userid: string, newAvatar: any) {
      const getOldFileName = await supabase
        .from('profiles')
        .select('avatar_filename')
        .eq('userid', userid)
      
      console.log("getOldFileNameResponse: ", getOldFileName)
      const oldFileName = getOldFileName.data[0].avatar_filename
      console.log("oldFileName: ", oldFileName)

      const deleteAvatar = await supabase
        .storage
        .from('avatars')
        .remove([`${oldFileName}`])

      console.log("deleteAvatarResponse: ", deleteAvatar)

      const fileName: string = `${userid}-${Math.floor(Math.random()*10000)}.${newAvatar.name.split('.')[1]}`

      console.log("fileName: ", fileName)

      const { profilePicResponse } = await supabase.storage
        .from('avatars')
        .upload(`${fileName}`, newAvatar)

      console.log("profilePicResponse: ", profilePicResponse)

      const imageURL = await supabase.storage
        .from('avatars') // :)
        .getPublicUrl(`${fileName}`)

      console.log("imageURL: ", imageURL)

      const updateURL = await supabase
        .from('profiles')
        .update({ avatarurl: imageURL.data.publicUrl, avatar_filename: fileName })
        .eq('userid', userid)

      console.log("updateURL: ", updateURL)

      this.onPageLoad()

      return updateURL
    },
    async resetAvatar(userid: string) {
      const defaultImgURL =  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'
      const getAvatar = await supabase
        .from('profiles')
        .select('avatar_filename')
        .eq('userid', userid)

      const oldFileName = getAvatar.data[0].avatar_filename

      const updateURL = await supabase
        .from('profiles')
        .update({ avatarurl: defaultImgURL, avatar_filename: null })
        .eq('userid', userid)

      this.onPageLoad()

      if (oldFileName != null) {
        const deleteAvatar = await supabase
          .storage
          .from('avatars')
          .remove([`${oldFileName}`])

        return updateURL
      }

      return 
    },
    async updateUserAuth(userid: string, update: object) {
      const response = await supabaseServiceRole
        .auth
        .updateUser({...update })

      return response;
    },
    async deleteUser(userid: string) {
      // Your method logic here
      const getUserAvatar = await supabase
        .from('profiles')
        .select("avatar_filename")
        .eq('userid', userid)

      if (getUserAvatar.data[0].avatar_filename != null) { 
        const oldFileName = getUserAvatar.data[0].avatar_filename  
        
        console.log('oldFileName: ', oldFileName)

        const deleteAvatar = await  supabase
          .storage
          .from('avatars')
          .remove([`${oldFileName}`])

        console.log('deleteAvatar Response: ', deleteAvatar)
      }

      const response = await supabaseServiceRole
        .auth
        .admin
        .deleteUser(userid)

      console.log('response: ', response)

      console.log(response)
      this.checkSession()

      localStorage.clear()
      window.location.href = '/'
      return response;
    },    
  },
}