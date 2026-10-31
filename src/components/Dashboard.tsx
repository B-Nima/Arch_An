import { stats, competitions } from '../data/mockData';

export default function Dashboard() {
  const scrapedComps = competitions.filter(c => c.status === 'scraped');
  const totalRows = scrapedComps.reduce((sum, c) => sum + c.totalRows, 0);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon="🏆"
          label="Соревнований"
          value={stats.totalCompetitions.toString()}
          sublabel="в каталоге"
          color="blue"
        />
        <StatCard
          icon="✅"
          label="Скачано"
          value={stats.scraped.toString()}
          sublabel={`из ${stats.totalCompetitions}`}
          color="green"
        />
        <StatCard
          icon="📊"
          label="Строк данных"
          value={totalRows.toLocaleString()}
          sublabel="в CSV файлах"
          color="purple"
        />
        <StatCard
          icon="⏱️"
          label="Последний запуск"
          value={stats.lastRun.split(' ')[1] || stats.lastRun}
          sublabel={stats.lastRun.split(' ')[0]}
          color="amber"
        />
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scraping Progress */}
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>⚡</span> Статус сбора данных
          </h3>
          <div className="space-y-4">
            <ProgressBar
              label="2025"
              current={4}
              total={6}
              color="from-emerald-400 to-emerald-600"
            />
            <ProgressBar
              label="2026"
              current={0}
              total={4}
              color="from-blue-400 to-blue-600"
            />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <StatusBadge label="Готово" count={stats.scraped} color="emerald" />
            <StatusBadge label="В процессе" count={stats.inProgress} color="amber" />
            <StatusBadge label="Ожидание" count={stats.pending} color="slate" />
          </div>
        </div>

        {/* System Info */}
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>🔧</span> Конфигурация
          </h3>
          <div className="space-y-3">
            <ConfigRow label="Источник" value="results.archery.ru" />
            <ConfigRow label="Библиотека" value="curl_cffi" />
            <ConfigRow label="TLS отпечаток" value="Chrome 124" />
            <ConfigRow label="Задержка запросов" value="4.0 сек" />
            <ConfigRow label="Таймаут" value="25 сек" />
            <ConfigRow label="Макс. повторов" value="3" />
            <ConfigRow label="Целевые отчёты" value="rI, rT" />
            <ConfigRow label="Формат вывода" value="CSV (UTF-8-sig)" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>📈</span> Последние скачанные
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-700/50">
                <th className="pb-3 pr-4 font-medium">Соревнование</th>
                <th className="pb-3 pr-4 font-medium">Год</th>
                <th className="pb-3 pr-4 font-medium">Категорий</th>
                <th className="pb-3 pr-4 font-medium">Строк</th>
                <th className="pb-3 font-medium">Обновлено</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {scrapedComps.slice(0, 5).map(comp => (
                <tr key={comp.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getTypeEmoji(comp.type)}</span>
                      <span className="text-white font-medium truncate max-w-[200px]">{comp.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-slate-300">{comp.year}</td>
                  <td className="py-3 pr-4 text-slate-300">{comp.categories}</td>
                  <td className="py-3 pr-4">
                    <span className="text-emerald-400 font-mono">{comp.totalRows.toLocaleString()}</span>
                  </td>
                  <td className="py-3 text-slate-400 text-xs">{comp.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>🏗️</span> Архитектура скрапера
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-3 py-4">
          <FlowStep icon="🌐" label="results.archery.ru" />
          <FlowArrow />
          <FlowStep icon="🔒" label="TLS Chrome 124" />
          <FlowArrow />
          <FlowStep icon="🐍" label="curl_cffi" />
          <FlowArrow />
          <FlowStep icon="🍜" label="BeautifulSoup" />
          <FlowArrow />
          <FlowStep icon="📊" label="pandas" />
          <FlowArrow />
          <FlowStep icon="💾" label="CSV файлы" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sublabel, color }: {
  icon: string; label: string; value: string; sublabel: string; color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/20',
    green: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20',
    purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/20',
    amber: 'from-amber-500/20 to-amber-600/5 border-amber-500/20',
  };

  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-5 ${colorMap[color]}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs text-slate-400">{sublabel}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </div>
  );
}

function ProgressBar({ label, current, total, color }: {
  label: string; current: number; total: number; color: string;
}) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-slate-300">{label}</span>
        <span className="text-slate-400">{current}/{total}</span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-700/50 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function StatusBadge({ label, count, color }: { label: string; count: number; color: string }) {
  const colorMap: Record<string, string> = {
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    slate: 'bg-slate-500/10 border-slate-500/20 text-slate-400',
  };
  return (
    <div className={`rounded-xl border p-3 text-center ${colorMap[color]}`}>
      <div className="text-xl font-bold">{count}</div>
      <div className="text-xs mt-0.5">{label}</div>
    </div>
  );
}

function ConfigRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-slate-700/30 last:border-0">
      <span className="text-slate-400 text-sm">{label}</span>
      <span className="text-white text-sm font-mono">{value}</span>
    </div>
  );
}

function FlowStep({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl bg-slate-700/30 border border-slate-600/30">
      <span className="text-2xl">{icon}</span>
      <span className="text-xs text-slate-300 whitespace-nowrap">{label}</span>
    </div>
  );
}

function FlowArrow() {
  return <span className="text-slate-500 text-xl">→</span>;
}

function getTypeEmoji(type: string): string {
  const map: Record<string, string> = {
    'Чемпионат': '🥇',
    'Кубок': '🏆',
    'Первенство': '🎖️',
    'Соревнования': '🎯',
    'Турнир': '🏅',
  };
  return map[type] || '🎯';
}
