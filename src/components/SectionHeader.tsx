interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({ label, title, subtitle, centered = false, light = false }: SectionHeaderProps) {
  return (
    <div className={centered ? 'text-center' : ''}>
      <span className="text-caption text-[#e76f51] block mb-2">{label}</span>
      <h2 className={`text-display-2 ${light ? 'text-white' : 'text-[#f5ebe0]'} mt-2`}>{title}</h2>
      {subtitle && (
        <p className={`text-lg mt-4 max-w-[600px] ${centered ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-[#94a3b8]'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
