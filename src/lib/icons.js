import {
  Dumbbell,
  Flame,
  BicepsFlexed,
  Zap,
  Smartphone,
  Salad,
  Repeat,
  Target,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Award,
  Circle,
} from "lucide-react";

// Lucide v1 no longer ships brand logos, so simple outline versions live here.
function Instagram({ size = 24, strokeWidth = 2, className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function Facebook({ size = 24, strokeWidth = 2, className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/**
 * Maps icon names used in JSON data files to icon components.
 * Add a new entry here to make an icon available to content editors.
 */
const ICONS = {
  Dumbbell,
  Flame,
  BicepsFlexed,
  Zap,
  Smartphone,
  Salad,
  Repeat,
  Target,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
  Award,
};

export function getIcon(name) {
  return ICONS[name] || Circle;
}
