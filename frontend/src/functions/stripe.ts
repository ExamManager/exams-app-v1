import { supabase } from '../supabase'
import authenticate from './authenticate'



// Fetching from Stripe
// const response = await fetch(this.website + "/stripe/signup", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ email: this.email, name: this.firstname + " " + this.lastname, userid: this.user_id})
// })
// const error = await response.json()

export default {
  mixins: [authenticate],
  data() {
    return {
      //userid: String(localStorage.getItem('userid')),
      userid: this.$store.state.userid,
      website: "http://localhost:3001",
    }
  },
  methods: {
    // Authentication Functions
    // only run when called by a method
    async createCustomer() {
      // grab user id with this.checkOnRoute()
      const user_id = await authenticate
      console.log(user_id)
      console.log("create customer")

 
    },
    async createSubscription() {

    },
    async updateSubscription() {

    },
    async createPaymentMethod() {
    
    },
    async changePaymentMethod() {

    },
  },
}