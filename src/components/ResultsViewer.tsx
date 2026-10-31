import { useState } from 'react';
import { ResultRow, Competition, results as allResults } from '../data/mockData';

interface Props {
  results: ResultRow[];
  selectedCompetition: string | null;
  competitions: Competition[];
  onSelectCompetition: (id: string | null) => void;
}

export default function ResultsViewer({ results, selectedCompetition, competitions, onSelectCompetition }: Props) {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rank' | 'score'>('rank');

  const scrapedComps = competitions.filter(c => c.status === 'scraped');
  const categories = [...new Set(results.map(r => r.category))].sort();

  const filteredResults = results
    .filter(r => categoryFilter === 'all' || r.category === categoryFilter)
    .sort((a, b) => {
      if (sortBy === 'rank') return parseInt(a.rank) - parseInt(b.rank);
      return parseInt(b.score) - parseInt(a.score);
    });

  const currentComp = selectedCompetition
    ? competitions.find(c => c.id === selectedCompetition)
    : null;

  return (
    <div className="space-y-6">
      {/* Competition Selector */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={selectedCompetition || ''}
            onChange={(e) => onSelectCompetition(e.target.value || null)}
            className="flex-1 min-w-[250px] px-4 py-2.5 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            <option value="">Все соревнования ({allResults.length} записей)</option>
            {scrapedComps.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.year}) — {c.totalRows} строк
              </option>
            ))}
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            <option value="all">Все категории</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'rank' | 'score')}
            className="px-4 py-2.5 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            <option value="rank">По месту</option>
            <option value="score">По очкам</option>
          </select>
        </div>
      </div>

      {/* Competition Info */}
      {currentComp && (
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/5 rounded-2xl border border-amber-500/20 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">{currentComp.name}</h2>
              <div className="flex items-center gap-3 mt-1 text-sm text-slate-300">
                <span>📍 {currentComp.location}</span>
                <span>📅 {currentComp.year}</span>
                <span>🏷️ {currentComp.type}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-400">{filteredResults.length}</div>
              <div className="text-xs text-slate-400">записей</div>
            </div>
          </div>
        </div>
      )}

      {/* Results Table */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-700/30 text-left">
                <th className="px-4 py-3 font-medium text-slate-300 w-12">#</th>
                <th className="px-4 py-3 font-medium text-slate-300">Спортсмен</th>
                <th className="px-4 py-3 font-medium text-slate-300">Клуб / Регион</th>
                <th className="px-4 py-3 font-medium text-slate-300">Категория</th>
                <th className="px-4 py-3 font-medium text-slate-300 text-right">Очки</th>
                <th className="px-4 py-3 font-medium text-slate-300 text-right">X</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {filteredResults.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <RankBadge rank={row.rank} />
                  </td>
                  <td className="px-4 py-3 text-white font-medium">{row.archer}</td>
                  <td className="px-4 py-3 text-slate-300">{row.club}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex px-2 py-0.5 rounded-md bg-slate-700/50 text-slate-300 text-xs">
                      {row.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-white font-semibold">{row.score}</td>
                  <td className="px-4 py-3 text-right font-mono text-amber-400">{row.xCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredResults.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <span className="text-4xl block mb-3">🎯</span>
            <p>Нет данных для отображения</p>
            <p className="text-xs mt-1">Выберите соревнование со статусом «Скачано»</p>
          </div>
        )}
      </div>

      {/* Export Info */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">💾</span>
            <div>
              <p className="text-sm text-white font-medium">Экспорт в CSV</p>
              <p className="text-xs text-slate-400">UTF-8-sig • Все колонки: Год, ID_Соревнования, Название, Категория, Код, Тип, URL, + данные</p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors">
            ⬇️ Скачать CSV
          </button>
        </div>
      </div>
    </div>
  );
}

function RankBadge({ rank }: { rank: string }) {
  const num = parseInt(rank);
  if (num === 1) {
    return <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs">🥇</span>;
  }
  if (num === 2) {
    return <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-400/20 text-slate-300 font-bold text-xs">🥈</span>;
  }
  if (num === 3) {
    return <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-700/20 text-orange-400 font-bold text-xs">🥉</span>;
  }
  return <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-700/50 text-slate-400 font-mono text-xs">{rank}</span>;
}
