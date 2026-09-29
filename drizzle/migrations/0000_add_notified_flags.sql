ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS notified boolean NOT NULL DEFAULT false;
ALTER TABLE public.partner_applications ADD COLUMN IF NOT EXISTS notified boolean NOT NULL DEFAULT false;
ALTER TABLE public.pole_launch_alerts ADD COLUMN IF NOT EXISTS notified boolean NOT NULL DEFAULT false;