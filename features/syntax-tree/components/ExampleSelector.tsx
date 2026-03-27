import type { SyntaxExample } from '../types';

interface ExampleSelectorProps {
  examples: SyntaxExample[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const GROUPS = [
  { label: 'if', prefix: 'if' },
  { label: 'while', prefix: 'while' },
  { label: 'variable', prefix: 'var' },
] as const;

export default function ExampleSelector({ examples, selectedId, onSelect }: ExampleSelectorProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {GROUPS.map((group) => {
        const groupExamples = examples.filter((e) => e.id.startsWith(group.prefix));
        return (
          <div key={group.prefix} className="flex items-center gap-1.5">
            <span className="text-xs text-zinc-400">{group.label}</span>
            <span className="text-xs text-zinc-200">—</span>
            {groupExamples.map((example) => {
              const isSelected = example.id === selectedId;
              return (
                <button
                  key={example.id}
                  onClick={() => onSelect(example.id)}
                  className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                    isSelected
                      ? example.isValid
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                      : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700'
                  }`}
                >
                  {example.isValid ? 'válido' : 'inválido'}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

