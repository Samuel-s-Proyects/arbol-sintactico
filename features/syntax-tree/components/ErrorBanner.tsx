import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

interface ErrorBannerProps {
  message: string;
}

export default function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        className="mt-0.5 h-5 w-5 shrink-0 text-red-500"
      />
      <div>
        <p className="text-sm font-semibold text-red-700">
          No se pudo generar el árbol sintáctico
        </p>
        <p className="mt-1 text-sm leading-relaxed text-red-600">{message}</p>
      </div>
    </div>
  );
}
