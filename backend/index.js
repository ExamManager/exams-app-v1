import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import { MessageClient } from "cloudmailin";
import { passwordChangedTemplate } from './emailTemplates.js';
import { supabase } from "./supabaseClient.js";

dotenv.config();

const client = new MessageClient({
  username: process.env.MESSAGE_CLIENT_USERNAME || "unused",
  apiKey: process.env.MESSAGE_CLIENT_API_KEY || "unused",
});
const app = express();
app.use(cors());
// Placeholder keeps the service booting when secrets are not set yet.
const stripe = new Stripe(
  process.env.VITE_STRIPE_SECRET_KEY ||
    process.env.STRIPE_SECRET_KEY ||
    "sk_test_placeholder"
);
const port = process.env.PORT || 3001;

app.use(express.json());

// Vercel Services forwards /api/* with the prefix intact — strip for existing routes.
app.use((req, _res, next) => {
  if (req.url === "/api" || req.url.startsWith("/api/")) {
    req.url = req.url.slice(4) || "/";
  }
  next();
});

app.post("/email/accountverified", async (req, res) => {
  try {
    // const userid = req.body.userid;
    // const { data, error } = await supabase
    //   .from("profiles")
    //   .select("email, fullname")
    //   .eq("userid", userid);
    // if (error) {
    //   throw new Error(error.message);
    // }
    const response = await client.sendMessage({
      to: req.body.to,
      from: req.body.from,
      plain: req.body.plain,
      html:  req.body.html,  
      subject: req.body.subject,
    });
    //await sgMail.send(msg);
    res.status(200).json({ message: "success" });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
});

app.post("/stripe/createsubscription", async (req, res) => { // creates subscription in stripe | runs on account setup submit
  console.log("createsubscription");
  try {
    const userid = req.body.userid;
    console.log(userid);
    const subscription_level = String(req.body.subscription_level);
    console.log(subscription_level);
    if (subscription_level === "0") {
      var subscription_price = process.env.VITE_SUBSCRIPTION_PRICE_1;
    } else if (subscription_level === "1") {
      var subscription_price = process.env.VITE_SUBSCRIPTION_PRICE_2;
    } else if (subscription_level === "2") {
      var subscription_price = process.env.VITE_SUBSCRIPTION_PRICE_3;
    } else if (subscription_level === "3") {
      var subscription_price = process.env.VITE_SUBSCRIPTION_PRICE_4;
    } else {
      throw new Error("Invalid subscription level");
    }
    console.log(subscription_price);
    const { data, error } = await supabase
      .from("profiles")
      .select("customerid")
      .eq("userid", userid);
    if (error) {
      throw new Error(error.message);
    }
    const customer_id = data[0].customerid;
    const subscription = await stripe.subscriptions.create({
      customer: customer_id,
      items: [{ price: subscription_price }],
    });
    console.log(subscription);
    await supabase
      .from("profiles")
      .update({ subscriptionid: subscription.id })
      .eq("userid", userid);
    res.status(200).json({ message: "success" });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
});




app.post("/stripe/createcustomer", async (req, res) => { // createates custmer in stripe | runs onaccount setup submit
  console.log("createcustomer");
  try {
    const userid = req.body.userid;
    console.log(userid);
    const { data, error } = await supabase
      .from("profiles")
      .select("email, metadata, fullname")
      .eq("userid", userid);
    if (error) {
      throw new Error(error.message);
    }
    console.log(data);
    const customer = await stripe.customers.create({
      email: data[0].email,
      name: data[0].fullname,
      address: {
        line1: data[0].metadata.location.address1,
        line2: data[0].metadata.location.address2,
        city: data[0].metadata.location.city,
        postal_code: data[0].metadata.location.zip,
        country: data[0].metadata.location.country,
        state: data[0].metadata.location.state,
      },
    });
    const customer_id = String(customer.id);
    console.log("subscription");
    await supabase
      .from("profiles")
      .update({ customerid: customer_id})
      .eq("userid", userid);
    
    res.status(200).json({ message: "success" });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
});

app.post("/stripe/deletecustomer", async (req, res) => { // deletes customer in stripe | runs on account delete
  try {
    const userid = req.body.userid;
    const { data, error } = await supabase
      .from("profiles")
      .select("customerid")
      .eq("userid", userid);
    if (error) {
      throw new Error(error.message);
    }
    const customer_id = data[0].customerid;
    await stripe.customers.del(customer_id);
    res.status(200).json({ message: "success" });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message }); 
    } 
  } 
});

app.post("/stripe/createpaymentmethod", async (req, res) => { // creates payment method in stripe | runs on adding payment method
  try { // requires userid, cardNumber, expMonth, expYear, cvc, name, country, zip
    console.log(req.body);
    const userid = req.body.userid;
    // set to false if not default
    const default_payment = req.body.default_payment || false
    const { data, error } = await supabase
      .from("profiles")
      .select("customerid")
      .eq("userid", userid);
    if (error) {
      throw new Error(error.message);
    }
    console.log(data);
    console.log(error)
    const customer_id = data[0].customerid;
    console.log(customer_id);
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: req.body.cardNumber,
        exp_month: req.body.expMonth,
        exp_year: req.body.expYear,
        cvc: req.body.cvc,
      },
      billing_details: {
        name: req.body.name,
        address: {
          country: req.body.country,
          postal_code: req.body.zip
        },
      }
    });
    console.log("paymentMethod");
    console.log(paymentMethod);
    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: customer_id,
    });
    if (default_payment) {
      await stripe.customers.update(customer_id, {
        invoice_settings: {
          default_payment_method: paymentMethod.id,
        },
      });
    }
    res.status(200).json({ message: "success" });

  } catch (error) {
    res.status(500).json({ error: error.type });
    console.log(error.type);
  }
});

app.post("/stripe/updatedefaultpaymentmethod", async (req, res) => { // updates default payment method in stripe | runs on updating default payment method
  try {
    const userid = req.body.userid;
    const paymentMethodId = req.body.paymentMethodId;
    const { data, error } = await supabase
      .from("profiles")
      .select("customerid")
      .eq("userid", userid);
    if (error) {
      throw new Error(error.message);
    }
    const customer_id = data[0].customerid;
    await stripe.customers.update(customer_id, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });
    res.status(200).json({ message: "success" });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
});



app.post("/stripe/getpaymentmethods", async (req, res) => { // gets payment methods for a user | run on opening payment methods page
  try {
    const userid = req.body.userid;
    const { data, error } = await supabase
      .from("profiles")
      .select("customerid")
      .eq("userid", userid);
    if (error) {
      throw new Error(error.message);
    }
    const customer_id = data[0].customerid;
    const customer = await stripe.customers.retrieve(customer_id);
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customer_id,
      type: "card",
    });
    res.status(200).json({ paymentMethods: paymentMethods.data, default: customer.invoice_settings.default_payment_method });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
});

app.post("/stripe/getsubscription", async (req, res) => { // gets subscription for a user | run on opening subscription page
  console.log("getsubscription");
  try {
    const userid = req.body.userid;
    console.log(userid);
    const { data, error } = await supabase
      .from("profiles")
      .select("subscriptionid")
      .eq("userid", userid);
    console.log(data[0].subscriptionid);
    if (error) {
      throw new Error(error.message);
    }
    const subscription_id = data[0].subscriptionid;
    const subscription = await stripe.subscriptions.retrieve(subscription_id);
    res.status(200).json({ subscription: subscription });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
      console.log(err.message);
    }
  }
});


app.post("/stripe/deletepaymentmethod", async (req, res) => { // deletes payment method in stripe | runs on deleting payment method
  try {
    const userid = req.body.userid;
    const paymentMethodId = req.body.paymentMethodId;
    const { data, error } = await supabase
      .from("profiles")
      .select("customerid")
      .eq("userid", userid);
    if (error) {
      throw new Error(error.message);
    }
    const customer_id = data[0].customerid;
    await stripe.paymentMethods.detach(paymentMethodId);
    res.status(200).json({ message: "success" });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
});

app.post("/auth/deleteuser", async (req, res) => {
  try {
    const userid = req.body.userid;
    if (!userid) {
      throw new Error("userid is required");
    }
    const { error } = await supabase.auth.admin.deleteUser(userid);
    if (error) {
      throw new Error(error.message);
    }
    res.status(200).json({ message: "success" });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
});



app.get("/", (req, res) => {
  res.send("It somehow works well!");
});

export default app;

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log("running on " + port);
  });
}