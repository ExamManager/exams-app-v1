import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import { supabase } from "./supabaseClient.js";
import { MessageClient } from "cloudmailin"

const client = new MessageClient({ username: "710506dea731b2f9", apiKey: "i9b1YzNd7HHSvZuT5YtTZSjE"});
const app = express();
app.use(cors());
dotenv.config();
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);
const port = 3001;

app.use(express.json());


app.post("/email/accountverified", async (req, res) => {
  try {
    const userid = req.body.userid;
    const { data, error } = await supabase
      .from("profiles")
      .select("email, fullname")
      .eq("userid", userid);
    if (error) {
      throw new Error(error.message);
    }
    const response = await client.sendMessage({
      to: 'test@example.net',
      from: 'test@example.com',
      plain: 'test message',
      html:  '<h1>Test Message</h1>',
      subject: "hello world"
    });
    await sgMail.send(msg);
    res.status(200).json({ message: "success" });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
});



app.post("/stripe/createcustomer", async (req, res) => {
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
    console.log(customer);
    await supabase
      .from("profiles")
      .insert({ customerid: customer.id })
      .eq("userid", userid);
    console.log("updated");
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

app.listen(port, () => {
  console.log("running on " + port);
});