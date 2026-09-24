-- Migration to add Expo Push Token column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS expo_push_token TEXT;
