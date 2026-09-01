import { renderPage } from './routes';
import type { ViewKey } from './types';

interface AppRouteProps {
  view: ViewKey;
  onSelectView: (view: string) => void;
}

export function AppRoute({ view, onSelectView }: AppRouteProps) {
  return renderPage(view, onSelectView);
}
