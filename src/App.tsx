import { useState } from 'react';
import Dashboard from './components/Dashboard';
import CompetitionList from './components/CompetitionList';
import ResultsViewer from './components/ResultsViewer';
import ScrapingLog from './components/ScrapingLog';
import { competitions, results } from './data/mockData';

type Tab = 'dashboard' | 'competitions' | 'results' | 'logs';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null);

  const filteredResults = selectedCompetition
    ? results.filter(r => r.competitionId === selectedCompetition)
    : results;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <span className="text-xl">🏹</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Archery Results Scraper</h1>
                <p className="text-xs text-slate-400">results.archery.ru • curl_cffi</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Активно
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-slate-700/50 bg-slate-900/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2">
            {([
              { id: 'dashboard', label: 'Обзор', icon: '📊' },
              { id: 'competitions', label: 'Соревнования', icon: '🏆' },
              { id: 'results', label: 'Результаты', icon: '🎯' },
              { id: 'logs', label: 'Логи', icon: '📋' },
            ] as { id: Tab; label: string; icon: string }[]).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white/10 text-white shadow-lg shadow-white/5'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'competitions' && (
          <CompetitionList
            competitions={competitions}
            onSelectCompetition={(id: string) => {
              setSelectedCompetition(id);
              setActiveTab('results');
            }}
          />
        )}
        {activeTab === 'results' && (
          <ResultsViewer
            results={filteredResults}
            selectedCompetition={selectedCompetition}
            competitions={competitions}
            onSelectCompetition={setSelectedCompetition}
          />
        )}
        {activeTab === 'logs' && <ScrapingLog />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/40 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-slate-500">
            Archery Results Dashboard • Данные с results.archery.ru • Обход TLS через curl_cffi + Chrome 124 impersonation
          </p>
        </div>
      </footer>
    </div>
  );
}
