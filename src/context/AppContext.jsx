import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'uz');
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [user, setUser] = useState({
    name: 'Azizbek Rahimon',
    phone: '+998 90 123 45 67',
    loyaltyNumber: '1234 5678 9012',
    balance: 24500,
    spentThisMonth: 5000,
    earnedThisMonth: 4485,
    tier: 'Gold Member',
    memberSince: '12 Jan 2024',
    notifications: [
      { id: 1, title: 'Yangi aksiya!', body: 'Barcha ichimliklarga 20% keshbek!', time: '2 soat oldin', read: false },
      { id: 2, title: 'Bonuslar qo\'shildi', body: 'Xaridingiz uchun 1,250 ball qo\'shildi.', time: 'Kecha', read: false },
      { id: 3, title: 'Xush kelibsiz!', body: 'Kometa sodiqlik dasturiga xush kelibsiz.', time: '3 kun oldin', read: true },
    ]
  });

  const [transactions, setTransactions] = useState([
    { id: 1, store: 'Kometa - Chilonzor', addr: '19-kvartal', date: '13 Jan, 13:42', total: 125000, points: 1250, type: 'expense' },
    { id: 2, store: 'Kometa - Yunusobod', addr: '12-kvartal', date: '12 Jan, 18:20', total: 45000, points: 450, type: 'expense' },
    { id: 3, store: 'Kometa - Center', addr: 'Oybek', date: '10 Jan, 09:15', total: 210500, points: 2105, type: 'expense' },
    { id: 4, store: 'Kometa - Sergeli', addr: 'Yarmarka', date: '08 Jan, 16:30', total: 68000, points: 680, type: 'expense' },
    { id: 5, store: 'Bonus Almashtirish', addr: 'System', date: '01 Jan, 00:00', total: 0, points: -5000, type: 'redemption' },
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'uz' ? 'ru' : 'uz');
  };

  const translations = {
    uz: {
      hello: 'Salom',
      totalBalance: 'UMUMIY BALANS',
      points: 'ball',
      recentActivity: 'Oxirgi faollik',
      viewAll: 'Barchasini ko\'rish',
      myCard: 'Mening kartam',
      stores: 'Do\'konlar',
      profile: 'Profil',
      home: 'Asosiy',
      scanAtCheckout: 'Kassada skanerlang',
      loyaltyNumber: 'SODIQLIK RAQAMI',
      brightenScreen: 'Skanerlash osonroq bo\'lishi uchun ekranni yoritish',
      ourStores: 'Bizning do\'konlarimiz',
      searchStores: 'Do\'konlarni qidirish...',
      getDirections: 'Yo\'nalish olish',
      preferences: 'SOZLAMALAR',
      language: 'Til',
      darkMode: 'Tungi rejim',
      notifications: 'Bildirishnomalar',
      support: 'QUVVATLANISH',
      helpFaq: 'Yordam va FAQ',
      accountSettings: 'Hisob sozlamalari',
      logOut: 'Chiqish',
      thisMonth: 'SHU OYDA',
      toNextTier: 'KEYINGI DARAJAGACHA',
      qrCode: 'QR Kod',
      barcode: 'Shtrix-kod',
      version: 'Versiya',
      faqs: [
        { id: 1, question: "Ballarni qanday ishlash mumkin?", answer: "Xaridingizda har safar kassada raqamli kartangizni skanerlang. Har bir xarid uchun 1% keshbek ballarga ega bo'lasiz." },
        { id: 2, question: "Bonuslarni qayerda ishlatishim mumkin?", answer: "Yig'ilgan bonuslaringizni Kometa do'konlarida xaridingizning 100%igacha to'lash uchun ishlatishingiz mumkin." },
        { id: 3, question: "Balansimni qanday tekshirishim mumkin?", answer: "Joriy balans har doim Asosiy ekranda ko'rsatiladi va real vaqt rejimida yangilanadi." }
      ]
    },
    ru: {
      hello: 'Привет',
      totalBalance: 'ОБЩИЙ БАЛАНС',
      points: 'баллов',
      recentActivity: 'Последняя активность',
      viewAll: 'Посмотреть все',
      myCard: 'Моя карта',
      stores: 'Магазины',
      profile: 'Профиль',
      home: 'Главная',
      scanAtCheckout: 'Сканируйте на кассе',
      loyaltyNumber: 'НОМЕР ЛОЯЛЬНОСТИ',
      brightenScreen: 'Увеличьте яркость для удобства сканирования',
      ourStores: 'Наши магазины',
      searchStores: 'Поиск магазинов...',
      getDirections: 'Проложить маршрут',
      preferences: 'НАСТРОЙКИ',
      language: 'Язык',
      darkMode: 'Темный режим',
      notifications: 'Уведомления',
      support: 'ПОДДЕРЖКА',
      helpFaq: 'Помощь и FAQ',
      accountSettings: 'Настройки аккаунта',
      logOut: 'Выйти',
      thisMonth: 'В ЭТОМ МЕСЯЦЕ',
      toNextTier: 'ДО СЛЕД. УРОВНЯ',
      qrCode: 'QR Код',
      barcode: 'Штрих-код',
      version: 'Версия',
      faqs: [
        { id: 1, question: "Как заработать баллы?", answer: "Сканируйте вашу цифровую карту на кассе при каждой покупке. Вы получаете 1% кэшбэка баллами за каждую покупку." },
        { id: 2, question: "Где использовать бонусы?", answer: "Вы можете использовать накопленные бонусы для оплаты до 100% покупки в любом магазине Kometa." },
        { id: 3, question: "Как проверить баланс?", answer: "Ваш текущий баланс всегда отображается на главном экране и обновляется в режиме реального времени." }
      ]
    }
  };

  const t = (key) => {
    try {
      if (!translations || !language || !translations[language]) return key;
      return translations[language][key] || key;
    } catch (e) {
      return key;
    }
  };

  return (
    <AppContext.Provider value={{
      activeTab: activeTab || 'home',
      setActiveTab,
      language: language || 'uz',
      toggleLanguage,
      isDarkMode: !!isDarkMode,
      setIsDarkMode,
      user: user || {},
      t,
      transactions: transactions || [],
      setTransactions
    }}>
      {children}
    </AppContext.Provider>
  );
};
