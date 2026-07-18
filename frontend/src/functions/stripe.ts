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
      userid: "",
      website:
        import.meta.env.VITE_API_URL ||
        (import.meta.env.DEV ? "http://localhost:3001" : "/api"),
    }
  },
  methods: {
    // Authentication Functions
    // only run when called by a method
    async createCustomer() {
      // grab user id with this.checkOnRoute()
      const user_id = await authenticate.methods.checkOnRoute()
      console.log(user_id)
      console.log("create customer")
      const response = await fetch(this.website + "/stripe/createcustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userid: user_id })
      })
      // either return true or false
      if (response.status == 200) {
        return true
      } else {
        return false
      }
    },
    async createSubscription(subscription: integer) {
      const user_id = await authenticate.methods.checkOnRoute()
      console.log(user_id)
      console.log("create subscription")
      const response = await fetch(this.website + "/stripe/createsubscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userid: user_id, subscription_level: subscription })
      })
      if (response.status == 200) {
        return true
      } else {
        return false
      }
    },
    async deleteCustomer() {
      const user_id = await authenticate.methods.checkOnRoute()
      console.log(user_id)
      console.log("delete customer")
      const response = await fetch(this.website + "/stripe/deletecustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userid: user_id })
      })
      if (response.status == 200) {
        return true
      }
      else {
        return false
      }
    },
    async getPaymentMethods() {
      const user_id = await authenticate.methods.checkOnRoute()
      console.log(user_id)
      console.log("get payment methods")
      const response = await fetch(this.website + "/stripe/getpaymentmethods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userid: user_id })
      })
      if (response.status == 200) {
        return response.json()
      } else {
        return false
      }
    },
    async getSubscription() {
      const user_id = await authenticate.methods.checkOnRoute()
      console.log(user_id)
      console.log("get subscription")
      const response = await fetch(this.website + "/stripe/getsubscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userid: user_id })
      })
      if (response.status == 200) {
        return response.json()
        console.log("Success: "+response.json())
      } else {
        return false
      }
    },
    async createPaymentMethod(name: string, cardNumber: string, expMonth: string, expYear: string, cvc: string, country: string, zip: string, default_payment?: boolean) {
      const user_id = await authenticate.methods.checkOnRoute()
      console.log(user_id)
      console.log("create payment method")
      const response = await fetch(this.website + "/stripe/createpaymentmethod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userid: user_id, name: name, cardNumber: cardNumber, expMonth: expMonth, expYear: expYear, cvc: cvc, country: country, zip: zip, default_payment: default_payment || false })
      });
      const error = await response.json()
      console.log(error)
      if (response.status == 200) {
        return true
      } else {
        return error
      }
    },
    async updateDefaultPaymentMethod(paymentMethodId: string) {
      const user_id = await authenticate.methods.checkOnRoute()
      console.log(user_id)
      console.log("update default payment method")
      const response = await fetch(this.website + "/stripe/updatedefaultpaymentmethod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userid: user_id, paymentMethodId: paymentMethodId })
      })
      if (response.status == 200) {
        return paymentMethodId
      } else {
        return false
      }
    },
    async deletePaymentMethod(paymentMethodId: string) {
      const user_id = await authenticate.methods.checkOnRoute()
      console.log(user_id)
      console.log("delete payment method")
      const response = await fetch(this.website + "/stripe/deletepaymentmethod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userid: user_id, paymentMethodId: paymentMethodId })
      })
      if (response.status == 200) {
        return true
      } else {
        return false
      }
    },
  },
}