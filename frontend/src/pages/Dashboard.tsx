import { useMemo } from 'react';
import { ActivityPanel } from '../components/dashboard/ActivityPanel';
import { CategoryPanel } from '../components/dashboard/CategoryPanel';
import { HeaderPanel } from '../components/dashboard/HeaderPanel';
import { OverviewCards } from '../components/dashboard/OverviewCards';
import { PerformancePanel } from '../components/dashboard/PerformancePanel';
import { TrendChart } from '../components/dashboard/TrendChart';
import { WordCloudPanel } from '../components/dashboard/WordCloudPanel';
import { AppLayout } from '../layouts/AppLayout';
import { activityFeed, categoryMetrics, kpiCards, metricBars, wordCloud } from '../services/api';
import type { ViewKey } from '../types';

interface DashboardProps {
  activeView?: ViewKey;
  onSelectView?: (view: ViewKey) => void;
}

export default function DashboardPage({ activeView = 'dashboard', onSelectView = () => undefined }: DashboardProps) {
  const overview = useMemo(() => kpiCards, []);

  return (
    <AppLayout activeView={activeView} onSelectView={onSelectView}>
      <HeaderPanel />
      <OverviewCards cards={overview} />

      <section className="two-col-grid">
        <TrendChart />
        <CategoryPanel items={categoryMetrics} />
      </section>

      <section className="bottom-grid">
        <WordCloudPanel items={wordCloud} />
        <PerformancePanel metrics={metricBars} />
      </section>

      <section className="activity-grid">
        <ActivityPanel items={activityFeed} />
      </section>
    </AppLayout>
  );
}
