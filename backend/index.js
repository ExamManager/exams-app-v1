import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import { supabase } from "./supabaseClient.js";

const app = express();
app.use(cors());
dotenv.config();
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);
const port = 3001;

app.use(express.json());


app.get("/", (req, res) => {
  res.send("It somehow works well!");
});

app.listen(port, () => {
  console.log("running on " + port);
});