CREATE TABLE public.pole_launch_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  email text NOT NULL,
  name text NOT NULL,
  company text,
  pole text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  CONSTRAINT pole_launch_alerts_pole_check CHECK (pole IN ('nettoyage','diagnostic','agriculture','transport')),
  CONSTRAINT pole_launch_alerts_status_check CHECK (status IN ('pending','notified','unsubscribed'))
);

ALTER TABLE public.pole_launch_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can insert alerts"
ON public.pole_launch_alerts
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(name) BETWEEN 1 AND 100
  AND (company IS NULL OR char_length(company) <= 150)
);