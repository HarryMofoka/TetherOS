export function LifeScoreRing({ value = 82, size = 120 }: { value?: number; size?: number }) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="fill-none stroke-muted" />
      <circle
        cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="fill-none stroke-[color:var(--brand-blue)]"
      />
      <text x="50%" y="48%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-[22px] font-bold">{value}</text>
      <text x="50%" y="66%" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-[9px]">Great progress</text>
    </svg>
  );
}

export function MiniLineChart({ className = "" }: { className?: string }) {
  const points = [30, 55, 40, 68, 52, 72, 82];
  const w = 240, h = 80, pad = 6;
  const step = (w - pad * 2) / (points.length - 1);
  const max = 100;
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${pad + i * step} ${h - pad - (p / max) * (h - pad * 2)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className}>
      <path d={path} className="fill-none stroke-[color:var(--brand-blue)]" strokeWidth="2" />
      {points.map((p, i) => (
        <circle key={i} cx={pad + i * step} cy={h - pad - (p / max) * (h - pad * 2)} r="2.5" className="fill-[color:var(--brand-blue)]" />
      ))}
    </svg>
  );
}

export function Donut({ segments, size = 140 }: { segments: { value: number; color: string }[]; size?: number }) {
  const stroke = 18;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((a, b) => a + b.value, 0);
  let acc = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="fill-none stroke-muted" />
      {segments.map((s, i) => {
        const len = (s.value / total) * c;
        const el = (
          <circle
            key={i}
            cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke}
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={-acc}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            fill="none"
            stroke={s.color}
            strokeLinecap="butt"
          />
        );
        acc += len;
        return el;
      })}
      <text x="50%" y="46%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-[22px] font-bold">{total}</text>
      <text x="50%" y="62%" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-[10px]">Total</text>
    </svg>
  );
}

export function ProgressRing({ value, size = 44, color = "var(--brand-blue)" }: { value: number; size?: number; color?: string }) {
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="fill-none stroke-muted" />
      <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        fill="none" stroke={color} />
      <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-[10px] font-semibold">{value}%</text>
    </svg>
  );
}
