import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jhntnbdxccwkurctzccv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobnRuYmR4Y2N3a3VyY3R6Y2N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2OTE5NTIsImV4cCI6MjAyNzI2Nzk1Mn0.A34WrCmyqjcFvjSeuf4dAoHsfbRYTCIAobGYHS8H0ME";

export const supabase = createClient(supabaseUrl, supabaseKey);
