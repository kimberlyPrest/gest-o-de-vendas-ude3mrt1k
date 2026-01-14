-- Enable Row Level Security on the leads table
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to ensure clean state
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.leads;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON public.leads;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON public.leads;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON public.leads;
DROP POLICY IF EXISTS "Allow all access to leads for authenticated users" ON public.leads;

-- Create comprehensive policies for authenticated users
CREATE POLICY "Enable read access for authenticated users" 
ON public.leads FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Enable insert access for authenticated users" 
ON public.leads FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" 
ON public.leads FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Enable delete access for authenticated users" 
ON public.leads FOR DELETE 
TO authenticated 
USING (true);

-- Ensure indexes exist for performance (if not already present)
CREATE INDEX IF NOT EXISTS leads_status_idx ON public.leads (status);
CREATE INDEX IF NOT EXISTS leads_data_captacao_idx ON public.leads (data_captacao);
