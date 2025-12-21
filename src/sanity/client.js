import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "g8yf2nw8", 
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // false = always fetch fresh data (important for live score)
});