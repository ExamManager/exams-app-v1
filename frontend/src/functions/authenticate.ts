import { supabase } from '../supabase'
import * as templates from '../components/email/emailTemplates.js'

export default {
  data() {
    return {
      userid: "null",
    }
  },
  mixins: [templates],
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

      const newUserID = response.data.user.id
      const newUserEmail = response.data?.user.email
      const username = (response.data.user.email.split('@')[0]).split('\s')[0];;

      await this.sendEmail(
        newUserID,
        newUserEmail,
        "no-reply@examtimer.tech",
        "Welcome to our platform!",
        templates.accountCreatedTemplate(username),
        "Welcome to our platform!"
      )


      return response;
    },
    async checkSession() { // there is already one you can call
      // Your method logic here
      const { data } = await supabase.auth.getSession()
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

      if (response.error == null) {

        const userID = response.data.user.id
        const userEmail = response.data.user.email
        const username = (response.data.user.email.split('@')[0]).split('.')[0];

        await this.sendEmail(
          userID,
          userEmail,
          "no-reply@examtimer.tech",
          "New login detected",
          templates.newLoginTemplate(username),
          "New login detected"
        )
      }

      return response;
    },
    async signingoogle() {
      // Your method logic here
      const response = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })

      const sbData = localStorage.getItem("sb-vhnpyawfzfrcezeljwfm-auth-token")

      const userID = sbData.user.id
      const userEmail = sbData.user.email
      const username = (sbData.user.email.split('@')[0]).split('\s')[0];

      await this.sendEmail(
        userID,
        userEmail,
        "no-reply@examtimer.tech",
        "New login detected",
        templates.newLoginTemplate(username),
        "New login detected"
      )

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
      const response = await supabase.auth.getSession()
      if (response.data.session != null) {
        return response.data.session.user.id
      } else {
        return false
      }
    },
    async onPageLoad() { // done, runs on page load once and updates everything
      const data2 = await supabase.auth.getSession()
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

      const name = this.$store.state.fullname;
      const email = this.$store.state.email;

      await this.sendEmail(
        userid,
        email,
        "no-reply@examtimer.tech",
        "Account updated",
        templates.accountEditedTemplate(name),
        "Account updated"
      )

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
      const response = await supabase
        .auth
        .updateUser({...update })

      if (update.password) {
        await this.sendEmail(
          userid, 
          this.$store.state.email,
          'no-reply@examtimer.tech', 
          'Your password was changed!', 
          templates.passwordChangedTemplate(this.$store.state.fullname), 
          'Password changed'
        )
      } else {
        await this.sendEmail(
          userid,
          this.$store.state.email,
          'no-reply@examtimer.tech',
          'Your email was changed',
          templates.accountEditedTemplate(this.$store.state.fullname),
          'Email changed'
        )
      }

      return response;
    },
    async deleteUser(userid: string) {
      // Your method logic here
      const name = this.$store.state.fullname
      const email = this.$store.state.email
      const user = userid

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

      const response = await fetch("http://localhost:3001/auth/deleteuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userid })
      })

      this.checkSession()

      localStorage.clear()
      window.location.href = '/'

      await this.sendEmail(
        user,
        email,
        'no-reply@examtimer.tech',
        'Your account was deleted',
        templates.accountDeletedTemplate(name),
        'Account deleted'
      )

      return response;
    },    
    async checkUserExists(data: { col: string, val: string }) {
      const response = await supabase
        .from('profiles')
        .select('provider')
        .eq(data.col, data.val)

      console.log(response.data)
      return response.data;
    },
    async sendPasswordResetEmail(email: string) {
      const response = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:6969/setnewpassword',
      })

      console.log(response)
      return response;
    },
    async sendEmail(userid: string, to: any, from: string, plain: string, html: string, subject: string) {
      const response = await fetch("http://localhost:3001/email/accountverified", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          userid: userid,
          to: to,
          from: from,
          plain: plain,
          html: html,
          subject: subject
        })
      })
      const error = await response.json()

      console.log(error)
    },
    // async getCustomPlan(userid: string) {
    //   const response = await supabase
    //     .from('custom_plans')
    //     .select()
    //     .eq('id', userid)

    //   return response.data[0]
    // },
  },
}