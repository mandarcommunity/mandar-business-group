import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';

const supabaseUrl = "https://bmrjwnarwzygswkzrski.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcmp3bmFyd3p5Z3N3a3pyc2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2OTA1MzksImV4cCI6MjA5NjQxNTM5MX0.Yk8bBA5-hRnlqkCLl-FJ5cnXvNA8jC7ReO_CH7eG7Kg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
