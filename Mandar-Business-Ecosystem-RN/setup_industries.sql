CREATE TABLE public.industries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    emoji TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active industries
CREATE POLICY "Allow public read access to active industries"
ON public.industries FOR SELECT
USING (is_active = true OR auth.role() = 'authenticated');

-- Service role has all permissions by default, but let's be explicit if needed.
-- We don't need policies for insert/update/delete if using service role, but for the admin panel we might if admin uses auth.
-- Assuming Admin Panel uses standard admin auth or service role key.
