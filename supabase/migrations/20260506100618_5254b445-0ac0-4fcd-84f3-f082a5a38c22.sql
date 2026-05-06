CREATE TABLE public.partner_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  profession TEXT NOT NULL,
  message TEXT NOT NULL,
  rgpd_consent BOOLEAN NOT NULL DEFAULT false,
  source TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

ALTER TABLE public.partner_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a partner application"
ON public.partner_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(full_name) >= 2 AND char_length(full_name) <= 100
  AND char_length(email) >= 3 AND char_length(email) <= 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(phone) >= 8 AND char_length(phone) <= 20
  AND char_length(profession) >= 2 AND char_length(profession) <= 150
  AND char_length(message) >= 20 AND char_length(message) <= 2000
  AND rgpd_consent = true
);