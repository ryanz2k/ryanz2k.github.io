/** A screenshot inside a plain phone bezel. */
export default function Phone({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`rounded-[1.6rem] border border-white/10 bg-zinc-900 p-1.5 shadow-2xl shadow-black/50 ${className}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="block h-auto w-full rounded-[1.25rem]" />
    </div>
  )
}
