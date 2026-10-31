export interface Competition {
  id: string;
  name: string;
  year: string;
  url: string;
  status: 'scraped' | 'in_progress' | 'pending' | 'failed';
  categories: number;
  totalRows: number;
  lastUpdated: string;
  location: string;
  type: string;
}

export interface ResultRow {
  rank: string;
  archer: string;
  club: string;
  category: string;
  score: string;
  xCount: string;
  year: string;
  competitionId: string;
  competitionName: string;
}

export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

export const competitions: Competition[] = [
  {
    id: "comp-2025-001",
    name: "Чемпионат России по стрельбе из лука",
    year: "2025",
    url: "https://results.archery.ru/competition/comp-2025-001",
    status: "scraped",
    categories: 24,
    totalRows: 1847,
    lastUpdated: "2025-03-15 14:32",
    location: "Москва",
    type: "Чемпионат"
  },
  {
    id: "comp-2025-002",
    name: "Кубок России (этап 1)",
    year: "2025",
    url: "https://results.archery.ru/competition/comp-2025-002",
    status: "scraped",
    categories: 18,
    totalRows: 1203,
    lastUpdated: "2025-02-28 09:15",
    location: "Казань",
    type: "Кубок"
  },
  {
    id: "comp-2025-003",
    name: "Первенство России среди юниоров",
    year: "2025",
    url: "https://results.archery.ru/competition/comp-2025-003",
    status: "scraped",
    categories: 16,
    totalRows: 956,
    lastUpdated: "2025-04-10 16:45",
    location: "Санкт-Петербург",
    type: "Первенство"
  },
  {
    id: "comp-2025-004",
    name: "Всероссийские соревнования «Золотая стрела»",
    year: "2025",
    url: "https://results.archery.ru/competition/comp-2025-004",
    status: "in_progress",
    categories: 12,
    totalRows: 0,
    lastUpdated: "2025-05-20 11:00",
    location: "Ростов-на-Дону",
    type: "Соревнования"
  },
  {
    id: "comp-2025-005",
    name: "Чемпионат России по стрельбе из блочного лука",
    year: "2025",
    url: "https://results.archery.ru/competition/comp-2025-005",
    status: "pending",
    categories: 14,
    totalRows: 0,
    lastUpdated: "-",
    location: "Краснодар",
    type: "Чемпионат"
  },
  {
    id: "comp-2025-006",
    name: "Открытый Кубок Москвы",
    year: "2025",
    url: "https://results.archery.ru/competition/comp-2025-006",
    status: "scraped",
    categories: 20,
    totalRows: 1534,
    lastUpdated: "2025-01-22 18:30",
    location: "Москва",
    type: "Кубок"
  },
  {
    id: "comp-2026-001",
    name: "Чемпионат России 2026",
    year: "2026",
    url: "https://results.archery.ru/competition/comp-2026-001",
    status: "pending",
    categories: 22,
    totalRows: 0,
    lastUpdated: "-",
    location: "Москва",
    type: "Чемпионат"
  },
  {
    id: "comp-2026-002",
    name: "Кубок России (этап 1) 2026",
    year: "2026",
    url: "https://results.archery.ru/competition/comp-2026-002",
    status: "pending",
    categories: 18,
    totalRows: 0,
    lastUpdated: "-",
    location: "Новосибирск",
    type: "Кубок"
  },
  {
    id: "comp-2026-003",
    name: "Международный турнир «Стрела Сибири»",
    year: "2026",
    url: "https://results.archery.ru/competition/comp-2026-003",
    status: "failed",
    categories: 10,
    totalRows: 0,
    lastUpdated: "2026-01-05 08:00",
    location: "Новосибирск",
    type: "Турнир"
  },
  {
    id: "comp-2026-004",
    name: "Первенство России среди кадетов",
    year: "2026",
    url: "https://results.archery.ru/competition/comp-2026-004",
    status: "in_progress",
    categories: 14,
    totalRows: 0,
    lastUpdated: "2026-02-14 10:22",
    location: "Екатеринбург",
    type: "Первенство"
  },
];

export const results: ResultRow[] = [
  { rank: "1", archer: "Гарриев Бато", club: "Бурятия", category: "Олимпийский лук Мужчины", score: "698", xCount: "52", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "2", archer: "Цыбиков Галсан", club: "Бурятия", category: "Олимпийский лук Мужчины", score: "691", xCount: "48", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "3", archer: "Бальжиров Айдар", club: "Краснодарский край", category: "Олимпийский лук Мужчины", score: "685", xCount: "44", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "4", archer: "Дамбаев Алдар", club: "Иркутская область", category: "Олимпийский лук Мужчины", score: "679", xCount: "39", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "5", archer: "Аюшеев Баир", club: "Забайкальский край", category: "Олимпийский лук Мужчины", score: "674", xCount: "36", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "6", archer: "Шевченко Андрей", club: "Москва", category: "Олимпийский лук Мужчины", score: "671", xCount: "33", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "7", archer: "Ким Дмитрий", club: "Приморский край", category: "Олимпийский лук Мужчины", score: "668", xCount: "31", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "8", archer: "Ершов Михаил", club: "Татарстан", category: "Олимпийский лук Мужчины", score: "665", xCount: "28", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "1", archer: "Осипова Ксения", club: "Бурятия", category: "Олимпийский лук Женщины", score: "672", xCount: "41", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "2", archer: "Степанова Елена", club: "Москва", category: "Олимпийский лук Женщины", score: "668", xCount: "38", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "3", archer: "Дашинимаева Сагжид", club: "Забайкальский край", category: "Олимпийский лук Женщины", score: "661", xCount: "34", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "4", archer: "Петрова Анна", club: "Санкт-Петербург", category: "Олимпийский лук Женщины", score: "655", xCount: "30", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "5", archer: "Иванова Мария", club: "Краснодарский край", category: "Олимпийский лук Женщины", score: "650", xCount: "27", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "1", archer: "Шалаев Антон", club: "Москва", category: "Блочный лук Мужчины", score: "705", xCount: "58", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "2", archer: "Будаев Чингис", club: "Бурятия", category: "Блочный лук Мужчины", score: "699", xCount: "54", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "3", archer: "Козлов Игорь", club: "Татарстан", category: "Блочный лук Мужчины", score: "694", xCount: "49", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "1", archer: "Сидорова Ольга", club: "Казань", category: "Блочный лук Женщины", score: "688", xCount: "45", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "2", archer: "Николаева Татьяна", club: "Москва", category: "Блочный лук Женщины", score: "682", xCount: "42", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "3", archer: "Фролова Виктория", club: "Ростов-на-Дону", category: "Блочный лук Женщины", score: "676", xCount: "38", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "1", archer: "Гомбоев Алдар", club: "Бурятия", category: "Традиционный лук Мужчины", score: "445", xCount: "22", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "2", archer: "Доржиев Баир", club: "Забайкальский край", category: "Традиционный лук Мужчины", score: "438", xCount: "19", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "3", archer: "Михайлов Сергей", club: "Иркутская область", category: "Традиционный лук Мужчины", score: "431", xCount: "16", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "1", archer: "Цыренова Аюна", club: "Бурятия", category: "Традиционный лук Женщины", score: "412", xCount: "18", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "2", archer: "Базарова Сарюна", club: "Забайкальский край", category: "Традиционный лук Женщины", score: "405", xCount: "15", year: "2025", competitionId: "comp-2025-001", competitionName: "Чемпионат России" },
  { rank: "1", archer: "Волков Артём", club: "Москва", category: "Олимпийский лук Мужчины", score: "682", xCount: "42", year: "2025", competitionId: "comp-2025-002", competitionName: "Кубок России (этап 1)" },
  { rank: "2", archer: "Лебедев Павел", club: "Санкт-Петербург", category: "Олимпийский лук Мужчины", score: "676", xCount: "38", year: "2025", competitionId: "comp-2025-002", competitionName: "Кубок России (этап 1)" },
  { rank: "3", archer: "Хан Виталий", club: "Красноярск", category: "Олимпийский лук Мужчины", score: "670", xCount: "35", year: "2025", competitionId: "comp-2025-002", competitionName: "Кубок России (этап 1)" },
  { rank: "1", archer: "Морозова Дарья", club: "Казань", category: "Олимпийский лук Женщины", score: "665", xCount: "36", year: "2025", competitionId: "comp-2025-002", competitionName: "Кубок России (этап 1)" },
  { rank: "2", archer: "Белова Екатерина", club: "Москва", category: "Олимпийский лук Женщины", score: "659", xCount: "32", year: "2025", competitionId: "comp-2025-002", competitionName: "Кубок России (этап 1)" },
  { rank: "3", archer: "Орлова Наталья", club: "Новосибирск", category: "Олимпийский лук Женщины", score: "653", xCount: "29", year: "2025", competitionId: "comp-2025-002", competitionName: "Кубок России (этап 1)" },
];

export const logEntries: LogEntry[] = [
  { timestamp: "2025-05-20 11:00:01", level: "info", message: "ЗАПУСК | годы: 2025, 2026" },
  { timestamp: "2025-05-20 11:00:02", level: "info", message: "Прогрев сессии (получение cookies и TLS-рукопожатие)..." },
  { timestamp: "2025-05-20 11:00:04", level: "success", message: "Сессия успешно прогрета." },
  { timestamp: "2025-05-20 11:00:05", level: "info", message: "Загрузка реального контента из iframe..." },
  { timestamp: "2025-05-20 11:00:08", level: "success", message: "Найдено 47 уникальных соревнований." },
  { timestamp: "2025-05-20 11:00:08", level: "info", message: "Каталог обновлен: 5 записей. Всего: 47" },
  { timestamp: "2025-05-20 11:00:09", level: "info", message: "Годы в каталоге: ['2025', '2026']" },
  { timestamp: "2025-05-20 11:00:10", level: "info", message: "📅 ГОД 2025: найдено 38 соревнований" },
  { timestamp: "2025-05-20 11:00:11", level: "info", message: "[1/38] Чемпионат России по стрельбе из лука (comp-2025-001)" },
  { timestamp: "2025-05-20 11:00:15", level: "success", message: "   📥 Категорий к загрузке: 24" },
  { timestamp: "2025-05-20 11:00:19", level: "info", message: "   [1/24] Олимпийский лук Мужчины: 48 строк ✓" },
  { timestamp: "2025-05-20 11:00:23", level: "info", message: "   [2/24] Олимпийский лук Женщины: 42 строк ✓" },
  { timestamp: "2025-05-20 11:00:27", level: "info", message: "   [3/24] Блочный лук Мужчины: 36 строк ✓" },
  { timestamp: "2025-05-20 11:00:31", level: "info", message: "   [4/24] Блочный лук Женщины: 34 строк ✓" },
  { timestamp: "2025-05-20 11:00:35", level: "info", message: "   [5/24] Традиционный лук Мужчины: 28 строк ✓" },
  { timestamp: "2025-05-20 11:00:39", level: "info", message: "   [6/24] Традиционный лук Женщины: 22 строк ✓" },
  { timestamp: "2025-05-20 11:00:43", level: "warning", message: "   [7/24] Олимпийский лук Мужчины (юниоры): таблица пуста или не распознана." },
  { timestamp: "2025-05-20 11:00:47", level: "info", message: "   [8/24] Олимпийский лук Женщины (юниоры): 38 строк ✓" },
  { timestamp: "2025-05-20 11:00:51", level: "info", message: "   [9/24] Блочный лук Мужчины (юниоры): 32 строк ✓" },
  { timestamp: "2025-05-20 11:00:55", level: "info", message: "   [10/24] Блочный лук Женщины (юниоры): 29 строк ✓" },
  { timestamp: "2025-05-20 11:01:15", level: "success", message: "   ✅ Сохранено: comp-2025-001_Чемпионат_России_по_стрельбе_из_лука.csv (1847 строк)" },
  { timestamp: "2025-05-20 11:01:20", level: "info", message: "[2/38] Кубок России (этап 1) (comp-2025-002)" },
  { timestamp: "2025-05-20 11:01:24", level: "success", message: "   📥 Категорий к загрузке: 18" },
  { timestamp: "2025-05-20 11:02:30", level: "success", message: "   ✅ Сохранено: comp-2025-002_Кубок_России_этап_1.csv (1203 строк)" },
  { timestamp: "2025-05-20 11:02:35", level: "info", message: "[3/38] Первенство России среди юниоров (comp-2025-003)" },
  { timestamp: "2025-05-20 11:03:45", level: "success", message: "   ✅ Сохранено: comp-2025-003_Первенство_России_среди_юниоров.csv (956 строк)" },
  { timestamp: "2025-05-20 11:03:50", level: "info", message: "[4/38] Всероссийские соревнования «Золотая стрела» (comp-2025-004)" },
  { timestamp: "2025-05-20 11:03:54", level: "warning", message: "   ⚠️  Нет отчетов {'rI', 'rT'} на странице." },
  { timestamp: "2025-05-20 11:04:00", level: "info", message: "[5/38] Чемпионат России по стрельбе из блочного лука (comp-2025-005)" },
  { timestamp: "2025-05-20 11:04:04", level: "warning", message: "   ⏭️  Ожидание результатов на сайте..." },
  { timestamp: "2025-05-20 11:04:10", level: "info", message: "[6/38] Открытый Кубок Москвы (comp-2025-006)" },
  { timestamp: "2025-05-20 11:05:20", level: "success", message: "   ✅ Сохранено: comp-2025-006_Открытый_Кубок_Москвы.csv (1534 строк)" },
  { timestamp: "2025-05-20 11:05:25", level: "info", message: "📅 ГОД 2026: найдено 9 соревнований" },
  { timestamp: "2025-05-20 11:05:30", level: "info", message: "[1/9] Чемпионат России 2026 (comp-2026-001)" },
  { timestamp: "2025-05-20 11:05:34", level: "warning", message: "   ⏭️  Ожидание результатов на сайте..." },
  { timestamp: "2025-05-20 11:05:40", level: "info", message: "[2/9] Кубок России (этап 1) 2026 (comp-2026-002)" },
  { timestamp: "2025-05-20 11:05:44", level: "warning", message: "   ⏭️  Ожидание результатов на сайте..." },
  { timestamp: "2025-05-20 11:05:50", level: "info", message: "[3/9] Международный турнир «Стрела Сибири» (comp-2026-003)" },
  { timestamp: "2025-05-20 11:05:55", level: "error", message: "   ❌ Ошибка: сервер вернул 403 Forbidden. TLS-отпечаток заблокирован." },
  { timestamp: "2025-05-20 11:06:00", level: "info", message: "[4/9] Первенство России среди кадетов (comp-2026-004)" },
  { timestamp: "2025-05-20 11:06:04", level: "info", message: "   📥 Загрузка в процессе... (категория 3 из 14)" },
];

export const stats = {
  totalCompetitions: 47,
  scraped: 6,
  inProgress: 2,
  pending: 3,
  failed: 1,
  totalRows: 5540,
  totalCategories: 104,
  years: ["2025", "2026"],
  lastRun: "2025-05-20 11:06",
  uptime: "6 мин 4 сек",
};
