import { MessageCircle } from 'lucide-react';

export function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/261387729958"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_28px_rgba(37,211,102,0.5)] transition-all duration-200 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
      <MessageCircle size={28} className="text-white relative z-10" />
    </a>
  );
}
