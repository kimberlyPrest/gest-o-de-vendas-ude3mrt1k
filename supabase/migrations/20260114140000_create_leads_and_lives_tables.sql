-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY,
    nome_completo TEXT,
    email TEXT,
    telefone TEXT,
    assentos_adicionais INTEGER DEFAULT 0,
    origem TEXT,
    status TEXT DEFAULT 'Capturado',
    data_captacao TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    last_interaction TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    valor_estimado NUMERIC,
    notes JSONB DEFAULT '[]'::jsonb,
    history JSONB DEFAULT '[]'::jsonb,
    follow_up TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create lives table
CREATE TABLE IF NOT EXISTS public.lives (
    id TEXT PRIMARY KEY,
    date DATE NOT NULL,
    weekday TEXT,
    peak_viewers INTEGER DEFAULT 0,
    retained_viewers INTEGER DEFAULT 0,
    sales INTEGER DEFAULT 0,
    presenter TEXT,
    conversion_rate NUMERIC,
    retention_rate NUMERIC,
    revenue NUMERIC DEFAULT 0,
    additional_seats INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lives ENABLE ROW LEVEL SECURITY;

-- Create policies (permissive for authenticated users for this MVP)
CREATE POLICY "Allow all access to leads for authenticated users" ON public.leads FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all access to lives for authenticated users" ON public.lives FOR ALL USING (auth.role() = 'authenticated');
