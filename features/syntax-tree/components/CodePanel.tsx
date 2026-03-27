interface CodePanelProps {
  value: string;
  onChange: (code: string) => void;
  placeholder?: string;
}

export default function CodePanel({ value, onChange, placeholder }: CodePanelProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      spellCheck={false}
      autoCapitalize="off"
      autoCorrect="off"
      className="w-full min-h-52 resize-y overflow-auto rounded-lg border border-zinc-700 bg-zinc-950 p-4 font-mono text-sm leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
    />
  );
}
