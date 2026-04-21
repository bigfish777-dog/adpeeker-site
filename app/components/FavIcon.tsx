import { Brand, isLight } from "../data";

export function FavIcon({ brand, className = "" }: { brand: Brand; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg font-mono font-semibold ${className}`}
      style={{
        background: brand.bg,
        color: isLight(brand.bg) ? "#111" : "#fff",
        width: 32,
        height: 32,
        fontSize: 13,
        minWidth: 32,
      }}
    >
      {brand.letter}
    </div>
  );
}

export function FavIconSmall({ brand }: { brand: Brand }) {
  return (
    <div
      className="flex items-center justify-center rounded font-mono font-semibold"
      style={{
        background: brand.bg,
        color: isLight(brand.bg) ? "#111" : "#fff",
        width: 16,
        height: 16,
        fontSize: 8,
        minWidth: 16,
      }}
    >
      {brand.letter}
    </div>
  );
}
