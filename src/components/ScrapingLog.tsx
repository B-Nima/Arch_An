import { useState } from 'react';
import { logEntries } from '../data/mockData';

export default function ScrapingLog() {
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [autoScroll, setAutoScroll] = useState(true);

  const filteredLogs = logEntries.filter(entry => {
    if (filterLevel === 'all') return true;
    return entry.level === filterLevel;
  });

  const levelConfig: Record<string, { color: string; icon: string }> = {
    info: { color: 'text-slate-300', icon: 'ℹ️' },
    success: { color: 'text-emerald-400', icon: '✅' },
    warning: { color: 'text-amber-400', icon: '⚠️' },
    error: { color: 'text-red-400', icon: '❌' },
  };

  const counts = {
    info: logEntries.filter(e => e.level === 'info').length,
    success: logEntries.filter(e => e.level === 'success').length,
    warning: logEntries.filter(e => e.level === 'warning').length,
    error: logEntries.filter(e => e.level === 'error').length,
  };

  return (
    <div className="space-y-6">
      {/* Log Controls */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterLevel('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterLevel === 'all'
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Все ({logEntries.length})
            </button>
            <button
              onClick={() => setFilterLevel('success')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterLevel === 'success'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              ✅ Успех ({counts.success})
            </button>
            <button
              onClick={() => setFilterLevel('info')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterLevel === 'info'
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              ℹ️ Инфо ({counts.info})
            </button>
            <button
              onClick={() => setFilterLevel('warning')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterLevel === 'warning'
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              ⚠️ Предупреждения ({counts.warning})
            </button>
            <button
              onClick={() => setFilterLevel('error')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterLevel === 'error'
                  ? 'bg-red-500/20 text-red-400'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              ❌ Ошибки ({counts.error})
            </button>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500/50"
            />
            Автопрокрутка
          </label>
        </div>
      </div>

      {/* Log Output */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-700/50 overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            <span className="text-xs text-slate-400 ml-2 font-mono">scraping_log.txt</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">{filteredLogs.length} записей</span>
        </div>

        {/* Log Lines */}
        <div className="p-4 max-h-[600px] overflow-y-auto font-mono text-xs space-y-0.5">
          {filteredLogs.map((entry, idx) => {
            const config = levelConfig[entry.level];
            return (
              <div key={idx} className="flex gap-3 py-0.5 hover:bg-white/5 rounded px-2 -mx-2 transition-colors">
                <span className="text-slate-500 shrink-0">{entry.timestamp}</span>
                <span className="shrink-0">{config.icon}</span>
                <span className={`${config.color} break-all`}>{entry.message}</span>
              </div>
            );
          })}
          {autoScroll && (
            <div className="flex items-center gap-2 py-1 text-slate-500">
              <span className="animate-pulse">▊</span>
              <span className="text-slate-600">ожидание следующих записей...</span>
            </div>
          )}
        </div>
      </div>

      {/* Python Code Preview */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>🐍</span> Исходный код скрапера
        </h3>
        <div className="bg-slate-900/80 rounded-xl p-4 overflow-x-auto">
          <pre className="text-xs text-slate-300 font-mono leading-relaxed">
{`# -*- coding: utf-8 -*-
"""Массовый сбор результатов с results.archery.ru"""

from curl_cffi import requests
from bs4 import BeautifulSoup
import pandas as pd

# Конфигурация
YEARS_TO_SCRAPE = "2025-2026"
TARGET_REPORTS = {"rI", "rT"}
REQUEST_DELAY = 4.0  # Маскировка под человека

# TLS impersonation Chrome 124
SESSION = requests.Session(impersonate="chrome124")

def main():
    warmup_session()        # Получение cookies
    catalog = build_catalog()  # Поиск соревнований
    for year in years:
        for comp in competitions:
            scrape_competition(comp)  # Сбор данных`}
          </pre>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-xs text-slate-400">Зависимости:</span>
          <div className="flex flex-wrap gap-2">
            {['curl_cffi', 'beautifulsoup4', 'pandas', 'lxml'].map(dep => (
              <span key={dep} className="px-2 py-0.5 rounded-md bg-slate-700/50 text-slate-300 text-xs font-mono">
                {dep}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
