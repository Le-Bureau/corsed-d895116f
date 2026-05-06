DROP POLICY "Anyone can submit a contact form" ON public.contact_submissions;

CREATE POLICY "Anyone can submit a contact form"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(full_name) BETWEEN 2 AND 100
  AND char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (phone IS NULL OR char_length(phone) <= 20)
  AND request_type IN ('nettoyage','diagnostic','agriculture','transport','autre-expertise','partenariat','autre')
  AND char_length(message) BETWEEN 10 AND 2000
  AND rgpd_consent = true
);