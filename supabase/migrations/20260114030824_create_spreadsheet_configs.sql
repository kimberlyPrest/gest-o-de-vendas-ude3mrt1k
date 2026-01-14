-- Create the spreadsheet_configs table
CREATE TABLE IF NOT EXISTS public.spreadsheet_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT UNIQUE NOT NULL,
    spreadsheet_id TEXT NOT NULL,
    sheet_name TEXT NOT NULL,
    range TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for security (private by default, only accessible via Service Role in Edge Function)
ALTER TABLE public.spreadsheet_configs ENABLE ROW LEVEL SECURITY;

-- Seed the initial data
INSERT INTO public.spreadsheet_configs (type, spreadsheet_id, sheet_name)
VALUES 
    ('crm', '1j_Rwr5t3RPcs2HjEkrRBzJEnfhmJM8jZoq8IZNEpMk0', 'Adapta Elite'),
    ('lives', '1ZkYOpKQIefyc5jrb3_fVKQ1jCSXLh_7HOzlN7Xw3_oc', '🟢 Onboarding')
ON CONFLICT (type) DO UPDATE SET
    spreadsheet_id = EXCLUDED.spreadsheet_id,
    sheet_name = EXCLUDED.sheet_name;
