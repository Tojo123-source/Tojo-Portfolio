interface ContactRequest {
  method?: string;
  body?: unknown;
}

interface ContactResponse {
  status(code: number): ContactResponse;
  json(data: unknown): void;
}

export default async function handler(req: ContactRequest, res: ContactResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Configuration serveur manquante (clé email).' });
  }

  try {
    let body: Record<string, string> = {};
    try {
      body = JSON.parse((req.body as string) || '{}');
    } catch {
      body = (req.body as Record<string, string>) || {};
    }

    // Honeypot: si rempli, on simule un succès sans envoyer
    if (body.honeypot) {
      return res.status(200).json({ success: true });
    }

    // Validation serveur
    const errors: string[] = [];
    if (!body.name || (body.name as string).trim().length < 2) {
      errors.push('Le nom doit contenir au moins 2 caractères.');
    }
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      errors.push('Veuillez entrer une adresse email valide.');
    }
    if (!body.message || (body.message as string).trim().length < 10) {
      errors.push('Le message doit contenir au moins 10 caractères.');
    }
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(' ') });
    }

    const html = `
      <h2>Nouveau message depuis le portfolio</h2>
      <p><strong>Nom :</strong> ${escapeHtml(body.name)}</p>
      <p><strong>Email :</strong> ${escapeHtml(body.email)}</p>
      <p><strong>Message :</strong></p>
      <p>${escapeHtml(body.message).replace(/\n/g, '<br>')}</p>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: ['tojonahrandria@gmail.com'],
        subject: `Nouveau message de ${body.name}`,
        html,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Resend error:', response.status, detail);
      return res.status(500).json({
        error: "Erreur d'envoi. Veuillez réessayer ou utiliser WhatsApp.",
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return res.status(500).json({
      error: "Une erreur est survenue lors de l'envoi. Réessayez.",
    });
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
