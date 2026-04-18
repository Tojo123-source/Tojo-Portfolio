import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

const schema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Veuillez entrer une adresse email valide'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

export type ContactFormData = z.infer<typeof schema>;

export function useContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');

    try {
      // 1. Enregistrement dans Supabase (table contact_form)
      const { error: supabaseError } = await supabase
        .from('contact_form')
        .insert([{
          name: data.name,
          email: data.email,
          message: data.message,
        }]);

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        setStatus('error');
        return;
      }

      // 2. Envoi de l'email via Brevo
      try {
        const brevoApiKey = import.meta.env.VITE_BREVO_API_KEY || '';

        const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': brevoApiKey,
          },
          body: JSON.stringify({
            sender: { 
              email: 'novaskol393@gmail.com', 
              name: 'Tojo Nambinina - Portfolio' 
            },
            to: [{ 
              email: 'novaskol393@gmail.com', 
              name: 'Tojo Nambinina' 
            }],
            replyTo: { 
              email: data.email, 
              name: data.name 
            },
            subject: `Nouveau message de contact - ${data.name}`,
            htmlContent: `
              <h3 style="color:#e76f51;">Nouveau message depuis le site</h3>
              <p><strong>Nom :</strong> ${data.name}</p>
              <p><strong>Email :</strong> ${data.email}</p>
              <p><strong>Message :</strong></p>
              <div style="background:#f8f8f8; padding:15px; border-left:4px solid #e76f51; margin:10px 0;">
                ${data.message.replace(/\n/g, '<br>')}
              </div>
              <p style="font-size:12px; color:#666;">
                Envoyé le ${new Date().toLocaleString('fr-FR')}
              </p>
            `,
          }),
        });

        if (!brevoResponse.ok) {
          console.warn('Brevo warning:', brevoResponse.status);
        } else {
          console.log('✅ Email Brevo envoyé avec succès');
        }
      } catch (brevoErr) {
        console.warn('Brevo failed (non bloquant):', brevoErr);
      }

      // Succès total
      setStatus('success');
      form.reset();

      // Reset du statut après 4 secondes
      setTimeout(() => {
        setStatus('idle');
      }, 4000);

    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
    }
  };

  return { form, onSubmit, status };
}