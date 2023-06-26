import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import { supabase } from "./supabaseClient.js";
import { MessageClient } from "cloudmailin";
import { passwordChangedTemplate } from './emailTemplates.js';

const client = new MessageClient({ username: "710506dea731b2f9", apiKey: "i9b1YzNd7HHSvZuT5YtTZSjE"});
const app = express();
app.use(cors());
dotenv.config();
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);
const port = 3001;

app.use(express.json());


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



app.post("/stripe/createcustomer", async (req, res) => { // createates custmer in stripe | runs onaccount setup submit
  try {
    const userid = req.body.userid;
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
    await supabase
      .from("profiles")
      .update({ customerid: customer_id })
      .eq("userid", userid);
    console.log("updated");
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
    res.status(200).json({ message: "success" });

  } catch (error) {
    res.status(500).json({ error: error.type });
    console.log(error.type);
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
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customer_id,
      type: "card",
    });
    res.status(200).json({ paymentMethods: paymentMethods.data });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
});



app.get("/", (req, res) => {
  res.send("It somehow works well!");
});

app.listen(port, () => {
  console.log("running on " + port);
});