import { useState } from 'react';
import { Competition } from '../data/mockData';

interface Props {
  competitions: Competition[];
  onSelectCompetition: (id: string) => void;
}

export default function CompetitionList({ competitions, onSelectCompetition }: Props) {
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const years = [...new Set(competitions.map(c => c.year))].sort();

  const filtered = competitions.filter(c => {
    if (yearFilter !== 'all' && c.year !== yearFilter) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
              <input
                type="text"
                placeholder="Поиск по названию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50"
              />
            </div>
          </div>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            <option value="all">Все годы</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            <option value="all">Все статусы</option>
            <option value="scraped">✅ Скачано</option>
            <option value="in_progress">⏳ В процессе</option>
            <option value="pending">⏸️ Ожидание</option>
            <option value="failed">❌ Ошибка</option>
          </select>
          <div className="text-sm text-slate-400">
            Найдено: <span className="text-white font-medium">{filtered.length}</span>
          </div>
        </div>
      </div>

      {/* Competition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(comp => (
          <CompetitionCard
            key={comp.id}
            competition={comp}
            onSelect={() => onSelectCompetition(comp.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <span className="text-4xl block mb-3">🔍</span>
          <p>Соревнования не найдены</p>
        </div>
      )}
    </div>
  );
}

function CompetitionCard({ competition, onSelect }: { competition: Competition; onSelect: () => void }) {
  const statusConfig: Record<string, { label: string; color: string; icon: string }> = {
    scraped: { label: 'Скачано', color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', icon: '✅' },
    in_progress: { label: 'В процессе', color: 'bg-amber-500/10 border-amber-500/20 text-amber-400', icon: '⏳' },
    pending: { label: 'Ожидание', color: 'bg-slate-500/10 border-slate-500/20 text-slate-400', icon: '⏸️' },
    failed: { label: 'Ошибка', color: 'bg-red-500/10 border-red-500/20 text-red-400', icon: '❌' },
  };

  const status = statusConfig[competition.status];

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-5 hover:border-slate-600/50 transition-all group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm truncate group-hover:text-amber-300 transition-colors">
            {competition.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-slate-400">📍 {competition.location}</span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">{competition.type}</span>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${status.color}`}>
          {status.icon} {status.label}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 rounded-lg bg-slate-700/30">
          <div className="text-lg font-bold text-white">{competition.year}</div>
          <div className="text-xs text-slate-400">Год</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-slate-700/30">
          <div className="text-lg font-bold text-white">{competition.categories}</div>
          <div className="text-xs text-slate-400">Категорий</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-slate-700/30">
          <div className="text-lg font-bold text-emerald-400">{competition.totalRows > 0 ? competition.totalRows.toLocaleString() : '—'}</div>
          <div className="text-xs text-slate-400">Строк</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {competition.lastUpdated !== '-' ? `🕐 ${competition.lastUpdated}` : 'Не скачано'}
        </span>
        {competition.status === 'scraped' && (
          <button
            onClick={onSelect}
            className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-colors"
          >
            Просмотр →
          </button>
        )}
      </div>
    </div>
  );
}
