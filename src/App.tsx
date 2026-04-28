/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { 
  QrCode, 
  ChevronRight, 
  ShoppingCart, 
  Home, 
  User, 
  Calendar, 
  Box, 
  Truck,
  X,
  Search,
  Bell,
  ArrowRight,
  MoreHorizontal,
  Circle,
  Wifi,
  Battery,
  Signal,
  RefreshCw,
  Users,
  FileText,
  CreditCard,
  Lock,
  LogOut,
  Settings,
  Scan,
  CircleCheck,
  Package,
  Wallet,
  MapPin,
  Headset,
  Ticket,
  Star,
  Heart,
  Plus,
  Trash2,
  ShieldCheck,
  Smartphone,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { MealCard, Banner, Product, Transaction, TopUpRecord } from './types';

const INITIAL_MOCK_CARDS: MealCard[] = [
  {
    id: '1',
    title: '杭州硕洋科技',
    balance: 100,
    unitName: '杭州硕洋科技',
    cardId: '70001813989850712',
    color: 'bg-gradient-to-br from-blue-600 to-blue-800',
    allowedChannels: ['mall', 'jingxuan', 'canteen', 'box'],
    allowedTabs: ['home', 'mall', 'pay', 'jingxuan', 'mine'],
    subCardIds: ['s1'],
    userPhone: '139****5071'
  },
  {
    id: '2',
    title: '宁波送变电',
    balance: 100.79,
    unitName: '宁波送变电',
    cardId: '1959502521',
    color: 'bg-gradient-to-br from-red-500 to-red-700',
    allowedChannels: ['mall'],
    allowedTabs: ['home', 'mall', 'mine'],
    userPhone: '138****8888'
  },
  {
    id: '3',
    title: '建设银行',
    balance: 2000.0,
    unitName: '建设银行省分行',
    cardId: 'CCB9928192',
    color: 'bg-gradient-to-br from-blue-500 to-blue-700',
    allowedChannels: ['jingxuan'],
    allowedTabs: ['home', 'jingxuan', 'mine'],
    userPhone: '137****1234'
  },
  {
    id: '4',
    title: '杭州肿瘤医院',
    balance: 500.0,
    unitName: '杭州市肿瘤医院',
    cardId: 'HOSP00020',
    color: 'bg-gradient-to-br from-teal-500 to-teal-700',
    allowedChannels: ['canteen', 'box'],
    allowedTabs: ['home', 'pay', 'mine'],
    userPhone: '135****5678'
  },
  {
    id: '5',
    title: '钱塘区教育局',
    balance: 156.5,
    unitName: '钱塘区教育局',
    cardId: 'EDUQT001',
    color: 'bg-gradient-to-br from-green-500 to-green-700',
    allowedChannels: ['jingxuan', 'canteen', 'box'],
    allowedTabs: ['home', 'jingxuan', 'pay', 'mine'],
    userPhone: '131****9999'
  },
  {
    id: '6',
    title: '新昌电力',
    balance: 890.0,
    unitName: '国网新昌县供电公司',
    cardId: 'ELEC008',
    color: 'bg-gradient-to-br from-orange-500 to-orange-700',
    allowedChannels: ['jingxuan', 'mall'],
    allowedTabs: ['home', 'mall', 'jingxuan', 'mine'],
    userPhone: '189****1111'
  },
  {
    id: '7',
    title: '舟山菜篮子',
    balance: 340.2,
    unitName: '舟山菜篮子工程',
    cardId: 'ZSCLZ123',
    color: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
    allowedChannels: ['mall', 'canteen', 'box'],
    allowedTabs: ['home', 'mall', 'pay', 'mine'],
    userPhone: '132****4321'
  },
  {
    id: '8',
    title: '大牛集团',
    balance: 150.0,
    unitName: '大牛集团',
    cardId: 'DANIU0001_SUB',
    color: 'bg-gradient-to-br from-purple-500 to-purple-700',
    allowedChannels: ['mall', 'jingxuan', 'canteen', 'box'],
    allowedTabs: ['home', 'mall', 'pay', 'jingxuan', 'mine'],
    isSubCard: true,
    primaryUserPhone: '15874125896',
    userPhone: '139****1122'
  }
];

const MOCK_DEPENDENT_CARDS: MealCard[] = [
  {
    id: 's1',
    title: '杭州硕洋科技',
    balance: 50.0,
    unitName: '杭州硕洋科技',
    cardId: '70001813989850999',
    color: 'bg-gradient-to-br from-blue-400 to-blue-600',
    allowedChannels: ['mall'],
    allowedTabs: ['home', 'mall', 'mine'],
    isSubCard: true,
    primaryUserPhone: '139****5071',
    userPhone: '13609876543'
  }
];

const ALL_CARDS = [...INITIAL_MOCK_CARDS, ...MOCK_DEPENDENT_CARDS];

const MOCK_BANNERS: Banner[] = [
  {
    id: 'b1',
    imageUrl: 'https://picsum.photos/seed/mall1/800/400',
    link: '#',
    title: '热销好价 大迈露营桌椅套装'
  },
  {
    id: 'b2',
    imageUrl: 'https://picsum.photos/seed/mall2/800/400',
    link: '#',
    title: '4月踏青季 饭卡通线上商城'
  }
];

// Mock Products with Enterprise Mapping
const MOCK_PRODUCTS: (Product & { enterpriseId: string })[] = [
  // Enterprise 1: 瑞安融媒体 (Office & Snacks)
  { id: 'p1', enterpriseId: '1', name: '办公A4纸 500张/包', price: 25.0, imageUrl: 'https://picsum.photos/seed/paper/300/300', tag: '办公' },
  { id: 'p2', enterpriseId: '1', name: '得力订书机套装', price: 15.0, imageUrl: 'https://picsum.photos/seed/stapler/300/300' },
  { id: 'p3', enterpriseId: '1', name: '三只松鼠每日坚果', price: 69.0, imageUrl: 'https://picsum.photos/seed/nuts/300/300', tag: '零食' },
  
  // Enterprise 2: 世纪联华 (Groceries & Fresh)
  { id: 'p4', enterpriseId: '2', name: '五常大米 5kg', price: 59.9, imageUrl: 'https://picsum.photos/seed/rice/300/300', tag: '热销' },
  { id: 'p5', enterpriseId: '2', name: '特仑苏纯牛奶 12盒', price: 65.0, imageUrl: 'https://picsum.photos/seed/milk/300/300', tag: '限时' },
  { id: 'p6', enterpriseId: '2', name: '进口车厘子 500g', price: 45.0, imageUrl: 'https://picsum.photos/seed/cherry/300/300', tag: '生鲜' },
  
  // Enterprise 3: 饭卡通商城测试 (General)
  { id: 'p7', enterpriseId: '3', name: '维达抽纸 10包', price: 29.9, imageUrl: 'https://picsum.photos/seed/tissue/300/300' },
  { id: 'p8', enterpriseId: '3', name: '蓝月亮洗衣液 2kg', price: 39.0, imageUrl: 'https://picsum.photos/seed/soap/300/300', tag: '日用' },
  
  // Enterprise 4: 大牛集团 (Tech & High-end)
  { id: 'p9', enterpriseId: '4', name: '机械键盘 青轴', price: 299.0, imageUrl: 'https://picsum.photos/seed/kb/300/300', tag: '数码' },
  { id: 'p10', enterpriseId: '4', name: '人体工学椅', price: 899.0, imageUrl: 'https://picsum.photos/seed/chair/300/300', tag: '高端' },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', cardId: '1', channel: '员工食堂', amount: -15.5, time: '2024-04-20 12:30', type: 'payment' },
  { id: 't2', cardId: '1', channel: '联华超市', amount: -45.2, time: '2024-04-20 18:15', type: 'payment' },
  { id: 't3', cardId: '2', channel: '线上商城', amount: -65.0, time: '2024-04-21 10:05', type: 'payment' },
  { id: 't4', cardId: '1', channel: '智能售货柜', amount: -3.5, time: '2024-04-21 14:20', type: 'payment' },
  { id: 't5', cardId: '4', channel: '员工食堂', amount: -22.0, time: '2024-04-22 08:30', type: 'payment' },
  { id: 't6', cardId: '1', channel: '线上商城', amount: 30.0, time: '2024-04-22 11:00', type: 'refund' },
  { id: 't7', cardId: '2', channel: '联华超市', amount: -12.8, time: '2024-04-22 16:45', type: 'payment' },
  { id: 't8', cardId: '4', channel: '智能售货柜', amount: -5.0, time: '2024-04-23 09:15', type: 'payment' },
  { id: 't9', cardId: '2', channel: '全国商城', amount: -88.0, time: '2024-04-23 14:10', type: 'payment' },
  { id: 't10', cardId: 's1', channel: '全国商城', amount: -28.0, time: '2024-04-24 10:10', type: 'payment' },
  { id: 't11', cardId: '8', channel: '全国商城', amount: -105.0, time: '2024-04-25 14:20', type: 'payment' },
  { id: 't12', cardId: '8', channel: '智能售货柜', amount: -12.5, time: '2024-04-26 08:45', type: 'payment' },
  { id: 't13', cardId: '8', channel: '线上商城', amount: 50.0, time: '2024-04-26 21:00', type: 'refund' },
  { id: 't14', cardId: '8', channel: '员工食堂', amount: -20.0, time: '2024-04-27 12:10', type: 'payment' },
  { id: 't15', cardId: 's1', channel: '线上商城', amount: -45.0, time: '2024-04-27 15:30', type: 'payment' },
];

const MOCK_TOPUP_RECORDS: TopUpRecord[] = [
  { id: 'r1', cardId: '1', amount: 100.0, time: '2024-04-15 09:00', type: 'topup', method: '中台充值' },
  { id: 'r2', cardId: '1', amount: 200.0, time: '2024-04-16 14:30', type: 'topup', method: '微信充值' },
  { id: 'r3', cardId: '2', amount: 50.0, time: '2024-04-18 10:20', type: 'topup', method: '兑换卡充值' },
  { id: 'r4', cardId: '4', amount: 300.0, time: '2024-04-20 11:45', type: 'topup', method: '企业系统充值' },
  { id: 'r5', cardId: '1', amount: -20.0, time: '2024-04-21 16:00', type: 'deduction', method: '系统扣减' },
  { id: 'r6', cardId: '4', amount: 100.0, time: '2024-04-22 09:30', type: 'topup', method: '微信充值' },
];

// WeChat Style Header Component
const WeChatHeader = ({ 
  title, 
  showBack = false, 
  light = false, 
  forceLight = false, 
  onBack,
  headerBg,
  headerTextColor,
  capsuleBg,
  capsuleBorder,
  capsuleIconColor,
  setActiveTab
}: { 
  title: string, 
  showBack?: boolean, 
  light?: boolean, 
  forceLight?: boolean, 
  onBack?: () => void,
  headerBg?: any,
  headerTextColor?: any,
  capsuleBg?: any,
  capsuleBorder?: any,
  capsuleIconColor?: any,
  setActiveTab: (tab: string) => void
}) => {
  // If light or forceLight is true, it's always white
  const isLight = light || forceLight;
  const bg = isLight ? "rgba(255, 255, 255, 1)" : headerBg;
  const color = isLight ? "#000000" : headerTextColor;
  const cBg = isLight ? "rgba(0, 0, 0, 0.05)" : capsuleBg;
  const cBorder = isLight ? "rgba(0, 0, 0, 0.1)" : capsuleBorder;
  const cIcon = isLight ? "#000000" : capsuleIconColor;

  return (
    <motion.div 
      style={{ backgroundColor: bg, color }}
      className="fixed top-0 left-0 right-0 z-50 max-w-md mx-auto transition-colors duration-200"
    >
      {/* Status Bar */}
      <div className="h-6 flex items-center justify-between px-6 pt-1">
        <span className="text-[10px] font-bold">9:41</span>
        <div className="flex items-center gap-1">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <Battery className="w-3 h-3" />
        </div>
      </div>
      {/* Navigation Bar */}
      <div className="h-11 flex items-center justify-between px-4">
        <div className="flex-1 flex items-center">
          {showBack && (
            <button onClick={onBack || (() => setActiveTab('home'))} className="p-2">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
          )}
        </div>
        <div className="flex-1 text-center font-bold text-sm truncate px-2">{title}</div>
        <div className="flex-1 flex justify-end">
          <motion.div 
            style={{ backgroundColor: cBg, borderColor: cBorder, color: cIcon }}
            className="backdrop-blur-md border rounded-full h-8 flex items-center px-3 gap-3"
          >
            <MoreHorizontal className="w-4 h-4" />
            <div className="w-px h-3 bg-current opacity-20" />
            <Circle className="w-3.5 h-3.5 fill-current" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const TransactionHistoryPage = ({
  historyFilterCardId,
  setHistoryFilterCardId,
  historyFilterChannel,
  setHistoryFilterChannel,
  setMineSubTab,
  setActiveTab,
  MOCK_CARDS,
  ...headerProps
}: any) => {
  const viewableCards = MOCK_CARDS;
  const viewableMOCK_TRANSACTIONS = MOCK_TRANSACTIONS;

  const uniqueChannels = Array.from(new Set(viewableMOCK_TRANSACTIONS.map(t => t.channel)));
  
  const filteredTransactions = viewableMOCK_TRANSACTIONS
    .filter(t => {
      let isCardMatch = false;
      if (historyFilterCardId === 'all') {
        isCardMatch = MOCK_CARDS.some(c => c.id === t.cardId || (c.subCardIds?.includes(t.cardId) ?? false));
      } else {
        const selectedWalletCard = MOCK_CARDS.find(c => c.id === historyFilterCardId);
        isCardMatch = t.cardId === historyFilterCardId || 
                      (selectedWalletCard?.subCardIds?.includes(t.cardId) ?? false);
      }
      const channelMatch = historyFilterChannel === 'all' || t.channel === historyFilterChannel;
      return isCardMatch && channelMatch;
    })
    .sort((a, b) => new Date(b.time.replace(' ', 'T')).getTime() - new Date(a.time.replace(' ', 'T')).getTime());

  return (
    <div className="flex-1 bg-[#F8F9FB] flex flex-col h-full fade-in">
      <WeChatHeader 
        title="消费记录" 
        showBack 
        light 
        onBack={() => setMineSubTab('main')} 
        setActiveTab={setActiveTab}
        {...headerProps}
      />
      
      {/* Filters Sticky Header */}
      <div className="pt-24 px-6 pb-4 bg-white sticky top-0 z-30 space-y-3">
        <div className="flex gap-2">
          <div className="flex-1">
            <p className="text-[10px] text-gray-400 font-bold mb-1.5 ml-1">选择饭卡</p>
            <div className="relative">
              <select 
                value={historyFilterCardId}
                onChange={(e) => setHistoryFilterCardId(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl px-4 py-2.5 text-xs font-bold text-gray-700 appearance-none focus:ring-2 focus:ring-blue-100 pr-10"
              >
                <option value="all">全部饭卡</option>
                {viewableCards.map(c => (
                  <option key={c.id} value={c.id}>{c.isSubCard ? '(副卡) ' : ''}{c.title}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-gray-400 font-bold mb-1.5 ml-1">消费渠道</p>
            <div className="relative">
              <select 
                value={historyFilterChannel}
                onChange={(e) => setHistoryFilterChannel(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl px-4 py-2.5 text-xs font-bold text-gray-700 appearance-none focus:ring-2 focus:ring-blue-100 pr-10"
              >
                <option value="all">全部渠道</option>
                {uniqueChannels.map(ch => (
                  <option key={ch} value={ch}>{ch}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 pb-6 no-scrollbar">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(t => {
            const card = ALL_CARDS.find(c => c.id === t.cardId);
            const isSubCardTransaction = card?.isSubCard;

            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={t.id} 
                className="bg-white p-5 rounded-[32px] shadow-sm border border-gray-50 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${t.type === 'refund' ? 'bg-green-50' : 'bg-gray-50'}`}>
                    {t.channel === '员工食堂' && <Home className={`w-6 h-6 ${t.type === 'refund' ? 'text-green-600' : 'text-gray-400'}`} />}
                    {t.channel === '联华超市' && <ShoppingCart className={`w-6 h-6 ${t.type === 'refund' ? 'text-green-600' : 'text-gray-400'}`} />}
                    {t.channel === '智能售货柜' && <Box className={`w-6 h-6 ${t.type === 'refund' ? 'text-green-600' : 'text-gray-400'}`} />}
                    {t.channel === '线上商城' && <Package className={`w-6 h-6 ${t.type === 'refund' ? 'text-green-600' : 'text-gray-400'}`} />}
                    {t.channel === '全国商城' && <Truck className={`w-6 h-6 ${t.type === 'refund' ? 'text-green-600' : 'text-gray-400'}`} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                       <p className="text-sm font-black text-gray-900">{t.channel}</p>
                       {isSubCardTransaction && (
                         <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-100 italic scale-90 origin-left">
                           尾号{card?.userPhone?.slice(-4) || '****'} 副卡消费
                         </span>
                       )}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">{t.time} · {card?.title}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-base font-black ${t.type === 'refund' ? 'text-green-600' : 'text-gray-900'}`}>
                    {t.type === 'refund' ? '+' : ''}{t.amount.toFixed(2)}
                  </p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">{t.type === 'refund' ? '退款成功' : '支付完成'}</p>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="pt-20 flex flex-col items-center text-center opacity-40">
            <FileText className="w-16 h-16 mb-4" />
            <p className="text-sm font-bold">暂无相关消费记录</p>
          </div>
        )}
      </div>
    </div>
  );
};

const TopUpHistoryPage = ({
  topupFilterCardId,
  setTopupFilterCardId,
  topupFilterMethod,
  setTopupFilterMethod,
  setMineSubTab,
  setActiveTab,
  MOCK_CARDS,
  ...headerProps
}: any) => {
  const allRechargeMethods = ['兑换卡充值', '中台充值', '企业系统充值', '微信充值', '系统扣减'];
  
  const filteredRecords = MOCK_TOPUP_RECORDS.filter(r => {
    let isCardMatch = false;
    if (topupFilterCardId === 'all') {
      isCardMatch = MOCK_CARDS.some(c => c.id === r.cardId || (c.subCardIds?.includes(r.cardId) ?? false));
    } else {
      const selectedWalletCard = MOCK_CARDS.find(c => c.id === topupFilterCardId);
      isCardMatch = r.cardId === topupFilterCardId || 
                    (selectedWalletCard?.subCardIds?.includes(r.cardId) ?? false);
    }
    const methodMatch = topupFilterMethod === 'all' || r.method === topupFilterMethod;
    return isCardMatch && methodMatch;
  });

  return (
    <div className="flex-1 bg-[#F8F9FB] flex flex-col h-full fade-in relative overflow-hidden">
      <WeChatHeader 
        title="充值记录" 
        showBack 
        light 
        onBack={() => setMineSubTab('main')} 
        setActiveTab={setActiveTab}
        {...headerProps}
      />
      
      {/* Filters Fixed Header */}
      <div className="pt-24 px-6 pb-4 bg-white sticky top-0 z-30 space-y-3">
        <div className="flex gap-2">
          <div className="flex-1">
            <p className="text-[10px] text-gray-400 font-bold mb-1.5 ml-1">选择饭卡</p>
            <div className="relative">
              <select 
                value={topupFilterCardId}
                onChange={(e) => setTopupFilterCardId(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl px-4 py-2.5 text-xs font-bold text-gray-700 appearance-none focus:ring-2 focus:ring-blue-100 pr-10"
              >
                <option value="all">全部饭卡</option>
                {MOCK_CARDS.map(c => (
                  <option key={c.id} value={c.id}>{c.isSubCard ? '(副卡) ' : ''}{c.title}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-gray-400 font-bold mb-1.5 ml-1">充值类型</p>
            <div className="relative">
              <select 
                value={topupFilterMethod}
                onChange={(e) => setTopupFilterMethod(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl px-4 py-2.5 text-xs font-bold text-gray-700 appearance-none focus:ring-2 focus:ring-blue-100 pr-10"
              >
                <option value="all">全部类型</option>
                {allRechargeMethods.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Records List */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 pb-6 no-scrollbar">
        {filteredRecords.length > 0 ? (
          filteredRecords.map(r => {
            const card = ALL_CARDS.find(c => c.id === r.cardId);
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={r.id} 
                className="bg-white p-5 rounded-[32px] shadow-sm border border-gray-50 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${r.type === 'topup' ? 'bg-blue-50' : 'bg-red-50'}`}>
                    <CreditCard className={`w-6 h-6 ${r.type === 'topup' ? 'text-blue-600' : 'text-red-600'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900">{r.method}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{r.time} · {card?.title}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-base font-black ${r.type === 'topup' ? 'text-blue-600' : 'text-red-500'}`}>
                    {r.type === 'topup' ? '+' : ''}{r.amount.toFixed(2)}
                  </p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">{r.type === 'topup' ? '充值成功' : '扣款完成'}</p>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="pt-20 flex flex-col items-center text-center opacity-40">
            <CreditCard className="w-16 h-16 mb-4" />
            <p className="text-sm font-bold">暂无相关充值记录</p>
          </div>
        )}
      </div>
    </div>
  );
};

const FamilyCardPage = ({
  setMineSubTab,
  setActiveTab,
  MOCK_CARDS,
  ...headerProps
}: any) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [unbindConfirmSubId, setUnbindConfirmSubId] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [vCode, setVCode] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendCode = () => {
    setIsSending(true);
    setTimeout(() => setIsSending(false), 2000);
  };

  const handleAdd = () => {
    // Mock add
    setShowAddModal(false);
    setPhone('');
    setVCode('');
  };

  const handleUnbind = () => {
    // Mock unbind
    setUnbindConfirmSubId(null);
  };

  return (
    <div className="flex-1 bg-[#F8F9FB] flex flex-col h-full fade-in relative overflow-hidden">
      <WeChatHeader 
        title="亲情卡" 
        showBack 
        light 
        onBack={() => setMineSubTab('main')} 
        setActiveTab={setActiveTab}
        {...headerProps}
      />
      
      <div className="flex-1 overflow-y-auto pt-24 px-6 space-y-4 pb-6 no-scrollbar">
        <div className="bg-blue-50/50 p-4 rounded-3xl border border-blue-100/50">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-black text-blue-900">亲情卡功能说明</p>
              <p className="text-[10px] text-blue-600/70 mt-1 leading-relaxed">
                主卡用户可绑定家人的副卡，实现余额共享或代付。绑定需验证副卡持卡人手机验证码。
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {MOCK_CARDS.map(card => (
            <div key={card.id} className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-8 rounded-lg ${card.color} shadow-sm`} />
                  <div>
                    <p className="text-sm font-black text-gray-900">{card.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{card.cardId}</p>
                  </div>
                </div>
                {card.isSubCard ? (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-orange-50 text-orange-600">此卡为副卡</span>
                ) : (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">此卡为主卡</span>
                )}
              </div>

              {!card.isSubCard && (
                <div className="space-y-3 pt-3 border-t border-gray-50">
                   <div className="flex justify-between items-center bg-gray-50/50 p-3 rounded-2xl">
                     <span className="text-xs font-black text-gray-500">已绑定{card.subCardIds?.length || 0}张副卡，3张上限</span>
                     <button 
                      onClick={() => setShowAddModal(true)}
                      className="flex items-center gap-1 text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full active:scale-95 transition-transform"
                     >
                       <Plus className="w-3 h-3" /> 添加副卡
                     </button>
                   </div>
                   
                   {card.subCardIds && card.subCardIds.length > 0 ? (
                     card.subCardIds.map(subId => {
                       const subCard = ALL_CARDS.find(c => c.id === subId);
                       return (
                         <div key={subId} className="flex items-center justify-between px-2">
                           <div className="flex items-center gap-2">
                             <div className={`w-1.5 h-1.5 rounded-full ${subCard?.color || 'bg-gray-200'}`} />
                             <span className="text-[11px] font-black text-gray-700">{subCard?.userPhone || '未知号码'}</span>
                           </div>
                           <button 
                             onClick={() => setUnbindConfirmSubId(subId)}
                             className="text-[10px] font-black text-red-500 bg-red-50 px-2.5 py-1 rounded-full active:scale-90 transition-all"
                           >
                             解绑
                           </button>
                         </div>
                       );
                     })
                   ) : (
                     <div className="py-2 text-center">
                        <p className="text-[10px] text-gray-300 font-bold italic">暂未绑定任何副卡</p>
                     </div>
                   )}
                </div>
              )}

              {card.isSubCard && card.primaryUserPhone && (
                <div className="pt-3 border-t border-gray-50 space-y-2">
                   <div className="flex items-center gap-2 text-gray-500">
                     <Smartphone className="w-3.5 h-3.5" />
                     <span className="text-xs font-black">关联主卡: </span>
                     <span className="text-xs font-black text-gray-900">{card.primaryUserPhone}</span>
                   </div>
                   <p className="text-[10px] text-gray-300 bg-gray-50/50 p-2 rounded-xl text-center font-bold">
                     如需解绑请登录主卡操作
                   </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl relative z-10 p-8"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-black text-gray-900">绑定副卡</h3>
                <p className="text-[10px] text-gray-400 mt-1 font-bold">验证副卡用户预留手机号</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 ml-1">副卡手机号</label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="请输入11位手机号"
                      className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-sm font-black focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 ml-1">短信验证码</label>
                  <div className="flex gap-2">
                    <input 
                      type="number"
                      value={vCode}
                      onChange={(e) => setVCode(e.target.value)}
                      placeholder="6位验证码"
                      className="flex-1 bg-gray-50 border-none rounded-2xl py-3.5 px-4 text-sm font-black focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                    <button 
                      onClick={handleSendCode}
                      disabled={isSending}
                      className="whitespace-nowrap px-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black active:scale-95 transition-all disabled:opacity-50"
                    >
                      {isSending ? '发送中...' : '获取验证码'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="py-4 rounded-2xl bg-gray-100 text-gray-400 font-black text-xs active:scale-95 transition-all"
                >
                  取消
                </button>
                <button 
                  onClick={handleAdd}
                  disabled={!phone || !vCode}
                  className="py-4 rounded-2xl bg-blue-600 text-white font-black text-xs shadow-lg shadow-blue-100 active:scale-95 transition-all disabled:opacity-50"
                >
                  确认绑定
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {unbindConfirmSubId && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setUnbindConfirmSubId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-[280px] rounded-[32px] overflow-hidden shadow-2xl relative z-10 p-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-50 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-black text-gray-900">确认解绑</h3>
                <p className="text-[10px] text-gray-500 mt-1 font-bold">解绑后该副卡将无法继续使用本卡余额，是否确认？</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setUnbindConfirmSubId(null)}
                  className="py-3.5 rounded-2xl bg-gray-100 text-gray-400 font-black text-xs active:scale-95 transition-all"
                >
                  暂不解绑
                </button>
                <button 
                  onClick={handleUnbind}
                  className="py-3.5 rounded-2xl bg-red-600 text-white font-black text-xs shadow-lg shadow-red-100 active:scale-95 transition-all"
                >
                  确认解绑
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PaymentPasswordPage = ({
  activeCardIndex,
  setMineSubTab,
  setActiveTab,
  MOCK_CARDS,
  ...headerProps
}: any) => {
  const [phone, setPhone] = useState(MOCK_CARDS[activeCardIndex]?.userPhone || '');
  const [vCode, setVCode] = useState('');
  const [password, setPassword] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isSmallAmountFree, setIsSmallAmountFree] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [modalPassword, setModalPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
      if (msg === '修改成功') {
        setMineSubTab('main');
      }
    }, 1500);
  };

  const handleSendCode = () => {
    if (phone.length !== 11 && !phone.includes('*')) {
      alert('请输入正确的手机号');
      return;
    }
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1000);
  };

  const handleToggleSmallAmount = () => {
    if (!isSmallAmountFree) {
      setShowPasswordModal(true);
      setModalPassword('');
    } else {
      setIsSmallAmountFree(false);
    }
  };

  const confirmToggleSmallAmount = () => {
    if (modalPassword.length === 6) {
      setIsSmallAmountFree(true);
      setShowPasswordModal(false);
      setModalPassword('');
    }
  };

  const handleSave = () => {
    showToast('修改成功');
  };

  return (
    <div className="flex-1 bg-[#F8F9FB] flex flex-col h-full fade-in relative overflow-hidden">
      <WeChatHeader 
        title="支付体验及安全" 
        showBack 
        light
        onBack={() => setMineSubTab('main')}
        setActiveTab={setActiveTab}
        {...headerProps}
      />
      
      <div className="flex-1 overflow-y-auto pt-24 px-6 space-y-6 pb-20 no-scrollbar">
        {/* Helper info */}
        <div className="bg-purple-50 p-4 rounded-3xl border border-purple-100 flex items-start gap-4 shadow-sm shadow-purple-100/50">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-purple-200">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 pt-0.5">
            <p className="text-sm font-black text-purple-900 mb-1">忘记初始密码？</p>
            <p className="text-xs text-purple-700/80 leading-relaxed font-bold">不必担心！为了您的使用便利，我们支持通过短信验证码直接重置密码，免去了难忘的旧密码验证。</p>
          </div>
        </div>

        {/* Small Amount Settings */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50 flex items-center justify-between">
          <div>
             <div className="flex items-center gap-2 mb-1.5">
               <Shield className="w-5 h-5 text-green-500" />
               <p className="text-base font-black text-gray-800">小额免密支付</p>
             </div>
             <p className="text-[11px] text-gray-400 font-bold pl-7">当单笔支付金额在100元及以内时，</p>
             <p className="text-[11px] text-gray-400 font-bold pl-7">支持免除验证支付密码。</p>
          </div>
          <div 
             onClick={handleToggleSmallAmount}
             className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 ${isSmallAmountFree ? 'bg-green-500' : 'bg-gray-200'} `}
          >
             <motion.div 
               layout
               className="w-6 h-6 bg-white rounded-full shadow-sm"
               animate={{ x: isSmallAmountFree ? 24 : 0 }}
             />
          </div>
        </div>

        {/* Settings Container */}
        <div className="bg-white rounded-[32px] pb-4 shadow-sm border border-gray-50 overflow-hidden">
          <div className="bg-gray-50 px-6 py-5 border-b border-gray-100 mb-2">
             <p className="text-base font-black text-gray-800 tracking-tight">重置支付密码</p>
             <p className="text-[11px] text-gray-400 font-bold mt-1">保护您的资产安全，请勿泄露给他人</p>
          </div>
          
          <div className="px-5 space-y-4 pt-2">
            <div>
              <p className="text-xs font-bold text-gray-500 mb-2 pl-2">接收验证码的手机号</p>
              <div className="bg-[#F8F9FB] h-14 rounded-3xl px-5 flex items-center border border-gray-100/50">
                <input 
                  type="tel"
                  placeholder="请输入手机号"
                  className="bg-transparent flex-1 text-sm font-bold outline-none text-gray-800"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-500 mb-2 pl-2">短信验证码</p>
              <div className="flex gap-2">
                <div className="bg-[#F8F9FB] h-14 rounded-3xl px-5 flex items-center border border-gray-100/50 flex-1">
                  <input 
                    type="number"
                    placeholder="请输入验证码"
                    className="bg-transparent flex-1 text-sm font-bold outline-none text-gray-800"
                    value={vCode}
                    onChange={e => setVCode(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleSendCode}
                  disabled={countdown > 0 || isSending}
                  className="h-14 px-5 bg-gradient-to-br from-blue-500 to-blue-600 active:scale-95 transition-all text-white rounded-3xl text-[13px] font-black disabled:opacity-50 min-w-[110px] whitespace-nowrap shadow-lg shadow-blue-500/20"
                >
                  {isSending ? '发送中...' : countdown > 0 ? `${countdown}s` : '获取验证码'}
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-500 mb-2 pl-2">新的6位数字密码</p>
              <div className="bg-[#F8F9FB] h-14 rounded-3xl px-5 flex items-center border border-gray-100/50">
                <input 
                  type="password"
                  placeholder="请输入6位支付密码"
                  maxLength={6}
                  className="bg-transparent flex-1 text-sm font-bold outline-none tracking-[0.5em] text-gray-800 placeholder:tracking-normal placeholder:font-normal"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div className="pt-4">
              <button 
                onClick={handleSave}
                disabled={!phone || !vCode || password.length !== 6}
                className="w-full h-14 bg-gray-900 active:scale-[0.98] transition-all text-white rounded-3xl text-[15px] font-black disabled:opacity-30 disabled:active:scale-100 whitespace-nowrap shadow-xl shadow-gray-900/20"
              >
                确认修改
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPasswordModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-[280px] rounded-[32px] overflow-hidden shadow-2xl relative z-10 p-6"
            >
              <div className="text-center mb-6">
                <h3 className="text-lg font-black text-gray-900">验证支付密码</h3>
                <p className="text-[10px] text-gray-500 mt-1 font-bold">开启小额免密需验证当前支付密码</p>
              </div>
              <div className="bg-[#F8F9FB] h-12 rounded-2xl px-4 flex items-center border border-gray-100/50 mb-6">
                <input 
                  type="password"
                  placeholder="请输入6位支付密码"
                  maxLength={6}
                  className="bg-transparent w-full text-center text-sm font-bold outline-none tracking-[0.5em] text-gray-800 placeholder:tracking-normal placeholder:font-normal"
                  value={modalPassword}
                  onChange={e => setModalPassword(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setShowPasswordModal(false)}
                  className="py-3.5 rounded-2xl bg-gray-100 text-gray-400 font-black text-xs active:scale-95 transition-all"
                >
                  取消
                </button>
                <button 
                  onClick={confirmToggleSmallAmount}
                  disabled={modalPassword.length !== 6}
                  className="py-3.5 rounded-2xl bg-blue-600 text-white font-black text-xs shadow-lg shadow-blue-100 disabled:opacity-50 active:scale-95 transition-all"
                >
                  确认
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[400] bg-black/80 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl"
          >
            <p className="text-white text-sm font-bold whitespace-nowrap">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PreferencesPage = ({
  MOCK_CARDS,
  setMOCK_CARDS,
  defaultCardId,
  setDefaultCardId,
  setMineSubTab,
  activeCardIndex,
  setActiveCardIndex,
  ...headerProps
}: any) => {
  const moveCard = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === MOCK_CARDS.length - 1)) return;
    const newCards = [...MOCK_CARDS];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newCards[index], newCards[targetIndex]] = [newCards[targetIndex], newCards[index]];
    setMOCK_CARDS(newCards);
    
    if (activeCardIndex === index) {
      setActiveCardIndex(targetIndex);
    } else if (activeCardIndex === targetIndex) {
      setActiveCardIndex(index);
    }
  };

  return (
    <div className="flex-1 bg-[#F8F9FB] flex flex-col h-full fade-in relative overflow-hidden">
      <WeChatHeader 
        title="支付偏好设置" 
        showBack 
        light
        onBack={() => setMineSubTab('main')}
        {...headerProps}
      />
      <div className="flex-1 overflow-y-auto pt-24 px-6 space-y-6 pb-20 no-scrollbar">
        <div className="bg-blue-50 p-4 rounded-3xl border border-blue-100 flex items-start gap-4 shadow-sm shadow-blue-100/50">
          <div className="flex-1 pt-0.5">
            <p className="text-sm font-black text-blue-900 mb-1">调整排序与默认卡</p>
            <p className="text-[11px] text-blue-700/80 leading-relaxed font-bold mt-1">可调整首页、商城、支付等场景下的卡片顺序。当设置默认卡后，每次打开小程序都将优先展示为您设定的默认卡片。</p>
          </div>
        </div>

        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-50">
          <div className="bg-gray-50 px-6 py-5 border-b border-gray-100">
             <p className="text-base font-black text-gray-800 tracking-tight">卡片排序及默认项</p>
          </div>
          <div className="p-4 space-y-3">
            {MOCK_CARDS.map((card: any, index: number) => (
              <div key={card.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3 w-1/2">
                  <div className={`w-10 h-7 rounded-lg ${card.color} shadow-sm shrink-0`} />
                  <div className="min-w-0">
                    <p className="text-sm font-black text-gray-900 truncate">{card.title}</p>
                    <p className="text-[10px] text-gray-500 font-bold mt-0.5 truncate">{card.unitName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button 
                    onClick={() => setDefaultCardId(card.id)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-black transition-colors ${defaultCardId === card.id ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-400 border border-gray-200'}`}
                  >
                    {defaultCardId === card.id ? '默认使用' : '设为默认'}
                  </button>
                  <div className="flex flex-col pl-1 border-l border-gray-200">
                    <button 
                      onClick={() => moveCard(index, 'up')}
                      disabled={index === 0}
                      className="p-1 text-gray-400 hover:text-gray-900 disabled:opacity-20 disabled:hover:text-gray-400"
                    >
                      <ChevronRight className="w-4 h-4 -rotate-90" />
                    </button>
                    <button 
                      onClick={() => moveCard(index, 'down')}
                      disabled={index === MOCK_CARDS.length - 1}
                      className="p-1 text-gray-400 hover:text-gray-900 disabled:opacity-20 disabled:hover:text-gray-400"
                    >
                      <ChevronRight className="w-4 h-4 rotate-90" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MinePage = ({
  activeCardIndex,
  setActiveCardIndex,
  mineSubTab,
  setMineSubTab,
  setActiveTab,
  historyFilterCardId,
  setHistoryFilterCardId,
  historyFilterChannel,
  setHistoryFilterChannel,
  topupFilterCardId,
  setTopupFilterCardId,
  topupFilterMethod,
  setTopupFilterMethod,
  MOCK_CARDS,
  setMOCK_CARDS,
  defaultCardId,
  setDefaultCardId,
  ...headerProps
}: any) => {
  const renderContent = () => {
    switch (mineSubTab) {
      case 'password':
        return (
          <PaymentPasswordPage 
            activeCardIndex={activeCardIndex}
            setMineSubTab={setMineSubTab}
            setActiveTab={setActiveTab}
            MOCK_CARDS={MOCK_CARDS}
            {...headerProps}
          />
        );
      case 'preferences':
        return (
          <PreferencesPage
            MOCK_CARDS={MOCK_CARDS}
            setMOCK_CARDS={setMOCK_CARDS}
            defaultCardId={defaultCardId}
            setDefaultCardId={setDefaultCardId}
            setMineSubTab={setMineSubTab}
            activeCardIndex={activeCardIndex}
            setActiveCardIndex={setActiveCardIndex}
            {...headerProps}
          />
        );
      case 'family':
        return (
          <FamilyCardPage 
            setMineSubTab={setMineSubTab}
            setActiveTab={setActiveTab}
            MOCK_CARDS={MOCK_CARDS}
            {...headerProps}
          />
        );
      case 'transactions':
        return (
          <TransactionHistoryPage 
            historyFilterCardId={historyFilterCardId}
            setHistoryFilterCardId={setHistoryFilterCardId}
            historyFilterChannel={historyFilterChannel}
            setHistoryFilterChannel={setHistoryFilterChannel}
            setMineSubTab={setMineSubTab}
            setActiveTab={setActiveTab}
            MOCK_CARDS={MOCK_CARDS}
            {...headerProps}
          />
        );
      case 'topup':
        return (
          <TopUpHistoryPage 
            topupFilterCardId={topupFilterCardId}
            setTopupFilterCardId={setTopupFilterCardId}
            topupFilterMethod={topupFilterMethod}
            setTopupFilterMethod={setTopupFilterMethod}
            setMineSubTab={setMineSubTab}
            setActiveTab={setActiveTab}
            MOCK_CARDS={MOCK_CARDS}
            {...headerProps}
          />
        );
      default:
        return (
          <div className="flex flex-col h-full">
            <WeChatHeader title="个人中心" light setActiveTab={setActiveTab} {...headerProps} />
            
            {/* Profile Header */}
            <div className="pt-24 px-6 pb-8 bg-white rounded-b-[40px] shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-4 border-blue-50">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">13912345678</h2>
                </div>
              </div>
            </div>

            {/* Menu Sections */}
            <div className="px-4 mt-6 space-y-4">
              {/* Account Services */}
              <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-50">
                {[
                  { id: 'family', icon: Users, label: '亲情卡', sub: '绑定家人的副卡', color: 'text-orange-500', bg: 'bg-orange-50' },
                  { id: 'transactions', icon: FileText, label: '消费记录', sub: '查看历史消费详情', color: 'text-blue-500', bg: 'bg-blue-50' },
                  { id: 'topup', icon: CreditCard, label: '充值记录', sub: '查看历史充值详情', color: 'text-green-500', bg: 'bg-green-50' },
                ].map((item, i) => (
                  <motion.button 
                    key={i}
                    onClick={() => {
                      if (item.id === 'family') setMineSubTab('family');
                      if (item.id === 'transactions') setMineSubTab('transactions');
                      if (item.id === 'topup') setMineSubTab('topup');
                    }}
                    whileTap={{ backgroundColor: '#f9fafb' }}
                    className={`w-full flex items-center justify-between p-5 ${i !== 2 ? 'border-bottom border-gray-50' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 ${item.bg} rounded-2xl flex items-center justify-center`}>
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-gray-800">{item.label}</p>
                        <p className="text-[10px] text-gray-400">{item.sub}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </motion.button>
                ))}
              </div>

              {/* Security & Settings */}
              <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-50">
                {[
                  { icon: Lock, label: '修改支付密码', color: 'text-purple-500', bg: 'bg-purple-50' },
                  { icon: Settings, label: '支付偏好设置', color: 'text-gray-500', bg: 'bg-gray-50' },
                ].map((item, i) => (
                  <motion.button 
                    key={i}
                    whileTap={{ backgroundColor: '#f9fafb' }}
                    onClick={() => {
                      if (item.label === '修改支付密码') {
                        setMineSubTab('password');
                      } else if (item.label === '支付偏好设置') {
                        setMineSubTab('preferences');
                      }
                    }}
                    className={`w-full flex items-center justify-between p-5 ${i !== 1 ? 'border-bottom border-gray-50' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 ${item.bg} rounded-2xl flex items-center justify-center`}>
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-gray-800">{item.label}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </motion.button>
                ))}
              </div>

              {/* Logout Button */}
              <motion.button 
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-red-500 font-bold py-5 rounded-[32px] shadow-sm border border-gray-50 flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                <span>退出登录</span>
              </motion.button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`flex-1 bg-[#F8F9FB] flex flex-col h-full ${mineSubTab === 'main' ? 'overflow-y-auto pb-32' : 'overflow-hidden'} no-scrollbar`}>
      {renderContent()}
    </div>
  );
};

const HomePage = ({
  scrollRef,
  currentBanner,
  MOCK_BANNERS,
  activeCardIndex,
  MOCK_CARDS,
  handleCardClick,
  setSelectedPayCard,
  setActiveTab,
  filteredProducts,
  isMallLoading,
  setShowMiniProgramModal,
  cardScrollRef,
  WeChatHeaderWrapper
}: any) => (
  <div className="h-full overflow-y-auto pb-32 no-scrollbar" ref={scrollRef}>
    <WeChatHeaderWrapper title="饭卡通" />
    
    {/* Banner Section */}
    <div className="relative h-64 w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentBanner}
          src={MOCK_BANNERS[currentBanner].imageUrl}
          alt={MOCK_BANNERS[currentBanner].title}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      <div className="absolute bottom-10 left-4 right-4 flex justify-between items-end">
        <div className="text-white">
          <h2 className="text-xl font-bold leading-tight">{MOCK_BANNERS[currentBanner].title}</h2>
          <p className="text-xs opacity-80 mt-1">饭卡通商城 · 专属优惠</p>
        </div>
        <div className="flex gap-1 mb-1">
          {MOCK_BANNERS.map((_: any, i: number) => (
            <div 
              key={i} 
              className={`h-1 w-4 rounded-full ${i === currentBanner ? 'bg-white' : 'bg-white/40'} transition-all`}
            />
          ))}
        </div>
      </div>
    </div>

    {/* Meal Cards - Horizontal Scroll */}
    <div className="mt-[-30px] relative z-10">
      <div 
        ref={cardScrollRef}
        className="card-container flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 gap-3 pb-4"
      >
        {MOCK_CARDS.map((card: any, idx: number) => (
          <motion.div
            key={card.id}
            className={`snap-center shrink-0 w-[85%] ${card.color} h-24 rounded-[20px] p-4 text-white shadow-xl relative overflow-hidden flex items-center justify-between`}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute -right-6 -top-6 w-16 h-16 bg-white/10 rounded-full blur-xl" />
            
            <div className="flex-1 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-[14px] font-extrabold truncate uppercase tracking-tight leading-none">{card.title}</h3>
                  {idx === activeCardIndex ? (
                    <span className="text-[11px] bg-green-500/90 text-white px-2 py-0.5 rounded-md font-bold whitespace-nowrap shadow-sm">使用中</span>
                  ) : (
                    <button 
                      onClick={() => handleCardClick(idx)}
                      className="text-[11px] bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded-md font-bold transition-colors whitespace-nowrap cursor-pointer ring-1 ring-white/20"
                    >
                      切换
                    </button>
                  )}
                </div>
                <p className="text-[9px] font-mono opacity-50 mt-1">ID: {card.cardId}</p>
              </div>
              
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold leading-none">
                  {card.balance !== null ? card.balance.toFixed(2) : '---'}
                </span>
                <span className="text-[8px] opacity-60 font-bold">余额</span>
              </div>
            </div>

            {card.allowedTabs.includes('pay') && (
              <div className="flex flex-col items-center justify-center h-full -mt-3">
                <div 
                  className="bg-white/20 px-4 py-2.5 rounded-2xl backdrop-blur-md active:scale-90 transition-transform cursor-pointer flex flex-col items-center gap-0.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (idx !== activeCardIndex) {
                      handleCardClick(idx);
                    } else {
                      setSelectedPayCard(card);
                      setActiveTab('pay');
                    }
                  }}
                >
                  <QrCode className="w-7 h-7" />
                  <span className="text-[10px] font-black opacity-90 tracking-tighter">去付款</span>
                </div>
              </div>
            )}

            {card.isSubCard && (
              <div className="absolute bottom-0 right-0 bg-gradient-to-l from-orange-600 to-orange-400 text-white px-4 py-1 rounded-tl-[16px] shadow-[0_-4px_12px_rgba(0,0,0,0.1)] font-black text-[10px] tracking-widest flex items-center justify-center border-t border-l border-white/30 z-20">
                副卡
              </div>
            )}
          </motion.div>
        ))}
        {/* Spacer to allow the last card to snap to center */}
        <div className="w-[15%] shrink-0" />
      </div>
    </div>

    {/* Quick Actions Grid - Dynamic based on card */}
    {(() => {
      const activeActions = [
        { id: 'jingxuan', icon: Truck, label: '鲸选到家', color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'box', icon: Box, label: '智能柜', color: 'text-purple-500', bg: 'bg-purple-50' },
        { id: 'canteen', icon: Calendar, label: '食堂订餐', color: 'text-green-500', bg: 'bg-green-50' },
        { id: 'mall', icon: ShoppingCart, label: '全国商城', color: 'text-red-500', bg: 'bg-red-50' },
      ].filter(action => MOCK_CARDS[activeCardIndex].allowedChannels.includes(action.id));
      
      // Hide entire section if only 'mall' is available
      if (activeActions.length === 0 || (activeActions.length === 1 && activeActions[0].id === 'mall')) {
        return null;
      }

      return (
        <div className="px-4 mt-2">
          <div className="bg-white rounded-[32px] p-5 grid grid-cols-5 gap-2 shadow-sm border border-gray-50">
            {activeActions.map((action: any, i: number) => (
              <motion.button 
                key={action.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (action.id === 'mall') setActiveTab('mall');
                  if (action.id === 'jingxuan') setShowMiniProgramModal(true);
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-11 h-11 ${action.bg} rounded-2xl flex items-center justify-center`}>
                  <action.icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <span className="text-[14px] font-black text-gray-700 whitespace-nowrap">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      );
    })()}

    {/* Mall Section - Dynamic based on card */}
    <div className="px-4 mt-8">
      <div className="flex justify-between items-center mb-5 px-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{MOCK_CARDS[activeCardIndex].title}商城</h2>
            <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">爆款</span>
          </div>
          <p className="text-[10px] text-blue-600 font-bold mt-1">
            正在浏览 [{MOCK_CARDS[activeCardIndex].title}] 专属商品
          </p>
        </div>
        <button className="text-xs text-blue-600 font-bold flex items-center gap-0.5">
          更多 <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {isMallLoading ? (
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-3xl p-4 h-48 animate-pulse shadow-sm border border-gray-50" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product: any) => (
            <motion.div 
              key={product.id} 
              className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 flex flex-col"
              whileTap={{ y: -4 }}
            >
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                {product.tag && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-lg font-bold">
                    {product.tag}
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-xs font-bold text-gray-800 line-clamp-2 leading-relaxed h-8">{product.name}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-[10px] font-bold text-red-500">¥</span>
                    <span className="text-base font-bold text-red-500">{product.price.toFixed(1)}</span>
                  </div>
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    className="bg-blue-600 p-2 rounded-xl"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Empty state for products */}
          {filteredProducts.length === 0 && (
            <div className="col-span-2 py-10 flex flex-col items-center opacity-30">
              <Package className="w-12 h-12 mb-3" />
              <p className="text-xs font-bold whitespace-nowrap px-4">该卡片暂无专属商品</p>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);

const PayPage = ({
  setActiveTab,
  selectedPayCard,
  setSelectedPayCard,
  setIsPayCardBottomSheetOpen,
  payType,
  setPayType,
  WeChatHeaderWrapper
}: any) => (
  <div className="flex-1 bg-[#F8F9FB] flex flex-col h-full overflow-y-auto pb-32 px-0 fade-in no-scrollbar">
    <WeChatHeaderWrapper title="付款码" showBack onBack={() => setActiveTab('home')} forceLight />
    <div className="pt-24 px-6">
      <div className="bg-white w-full rounded-[40px] overflow-hidden shadow-xl flex flex-col">
        {/* Header Card Selection */}
        <div className={`${selectedPayCard.color} p-6 text-white flex justify-between items-center`}>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2.5 rounded-2xl">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">付款码</h3>
              <p className="text-xs opacity-80">{selectedPayCard.title}</p>
            </div>
          </div>
        </div>
        
        {/* Code Content */}
        <div className="p-8 flex flex-col items-center gap-8">
          <div className="w-full">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-2 px-1">正在使用的饭卡</p>
            <motion.button 
              onClick={() => setIsPayCardBottomSheetOpen(true)}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gray-50/50 border border-gray-100 rounded-3xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-6 ${selectedPayCard.color} rounded-lg shadow-sm`} />
                <span className="text-sm font-bold text-gray-700">{selectedPayCard.title}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </motion.button>
          </div>

          <div className="flex flex-col items-center gap-6 w-full">
            {/* Barcode Placeholder */}
            <div className="w-full h-16 bg-white flex flex-col items-center gap-1 opacity-90">
              <div className="flex gap-1 w-full justify-center">
                {[...Array(40)].map((_, i) => (
                  <div key={i} className={`h-12 bg-black ${Math.random() > 0.5 ? 'w-[1px]' : 'w-[2px]'} ${Math.random() > 0.8 ? 'opacity-0' : ''}`} />
                ))}
              </div>
              <p className="text-[10px] font-mono tracking-[4px] text-gray-500">1959 5025 2100 8593</p>
            </div>

            {/* QR Code Placeholder */}
            <div className="relative p-4 bg-gray-50 rounded-[40px] border border-gray-100">
              <div className="w-48 h-48 bg-white p-2 rounded-[32px] flex items-center justify-center border-4 border-white shadow-inner">
                <QrCode className="w-40 h-40 text-gray-900" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center p-1.5 border border-gray-100">
                  <div className={`w-full h-full ${selectedPayCard.color} rounded-lg flex items-center justify-center`}>
                    <Circle className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-blue-600 animate-pulse">
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold">每分钟自动刷新</span>
            </div>
          </div>

          {/* Pay Type Toggle */}
          <div className="w-full flex bg-gray-100 rounded-2xl p-1 mt-2">
            {[
              { id: 'canteen', label: '食堂消费' },
              { id: 'store', label: '便利店消费' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setPayType(type.id as any)}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${payType === type.id ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 px-6 pb-20">
        <div className="bg-blue-50/50 rounded-[32px] p-6 border border-blue-100 flex items-start gap-4">
          <div className="bg-blue-100 p-2 rounded-xl">
            <Lock className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-blue-900">安全防护中</h4>
            <p className="text-[11px] text-blue-700/70 mt-1 leading-relaxed">
              支付过程经过多重加密，仅供在指定的POS机或扫码枪上使用，请勿分享或露在他处。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MallPage = ({
  setActiveTab,
  mallSubTab,
  setMallSubTab,
  selectedMallCardIndex,
  setIsMallCardBottomSheetOpen,
  activeCardIndex,
  isMallLoading,
  filteredProducts,
  scrollRef,
  MOCK_CARDS
}: any) => (
  <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8F9FB]" ref={scrollRef}>
    {/* WeChat Style Status Bar Simulator */}
    <div className="fixed top-0 left-0 right-0 h-10 z-[60] flex items-center justify-between px-6 pointer-events-none sticky bg-[#ff3d3d]">
       <span className="text-white text-[12px] font-bold">14:41</span>
       <div className="flex items-center gap-2">
         <Signal className="w-3 h-3 text-white fill-current" />
         <Wifi className="w-3 h-3 text-white" />
         <Battery className="w-4 h-4 text-white" />
       </div>
    </div>

    {/* Red Theme Custom Header */}
    <div className="bg-[#ff3d3d] pb-4 sticky top-0 z-50">
        <div className="px-4 h-12 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => setActiveTab('home')}
                    className="text-white font-black text-[22px] tracking-tight drop-shadow-sm active:scale-95 transition-transform"
                >
                    饭卡通
                </button>
                
                <button 
                    onClick={() => setIsMallCardBottomSheetOpen(true)}
                    className="bg-black/10 backdrop-blur-sm border border-white/20 rounded-full py-1.5 px-3 flex items-center gap-1.5 active:scale-95 transition-all max-w-[120px]"
                >
                    <CreditCard className="w-3 h-3 text-white/80" />
                    <span className="text-white text-[11px] font-black truncate">
                        {MOCK_CARDS[selectedMallCardIndex].title}
                    </span>
                    <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-white/80 ml-0.5" />
                </button>
            </div>

            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-full h-8 px-3 flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <Circle className="w-1.5 h-1.5 text-white/40 fill-current" />
                    <Circle className="w-2.5 h-2.5 text-white fill-current" />
                    <Circle className="w-1.5 h-1.5 text-white/40 fill-current" />
                </div>
                <div className="w-[1px] h-3 bg-white/20" />
                <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
                    <Circle className="w-2.5 h-2.5 text-white fill-current" />
                </div>
            </div>
        </div>

        <div className="px-4 mt-1">
            <div className="bg-white h-10 rounded-full flex items-center pl-4 pr-1 gap-2 shadow-lg">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="搜索商品" className="flex-1 text-[13px] outline-none bg-transparent font-medium" />
                <button className="bg-gradient-to-r from-[#ff7e5f] to-[#ff4b2b] text-white h-8 px-5 rounded-full text-[13px] font-black active:scale-95 transition-transform shadow-sm">
                    搜索
                </button>
            </div>
        </div>
    </div>

    <div className="flex-1 flex flex-col overflow-hidden">
        {/* Internal Mall Pages */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-48">
          {mallSubTab === 'mall-home' && (
            <div className="bg-[#f7f7f7] min-h-full">
              {/* Mall Banner Swiper */}
              <div className="px-4 mt-4 h-48 relative">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg relative">
                  <img src="https://picsum.photos/seed/mall_hero/800/400" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-white' : 'bg-white/40'}`} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-around py-4 px-2 text-[10px] text-gray-500 font-bold bg-white mb-2">
                <div className="flex items-center gap-1"><CircleCheck className="w-3.5 h-3.5 text-[#ff3d3d]" /> 48h发货</div>
                <div className="flex items-center gap-1"><CircleCheck className="w-3.5 h-3.5 text-[#ff3d3d]" /> 正品保障</div>
                <div className="flex items-center gap-1"><CircleCheck className="w-3.5 h-3.5 text-[#ff3d3d]" /> 售后无忧</div>
              </div>

              <div className="px-4 mt-2">
                <div className="bg-white rounded-3xl p-5 grid grid-cols-5 gap-y-5 shadow-sm">
                  {[
                    { label: '食品饮料', img: 'food' },
                    { label: '居家生活', img: 'home' },
                    { label: '美妆护肤', img: 'beauty' },
                    { label: '数码家电', img: 'tech' },
                    { label: '服饰箱包', img: 'bag' },
                    { label: '生鲜水果', img: 'fruit' },
                    { label: '个人护理', img: 'care' },
                    { label: '母婴玩具', img: 'baby' },
                    { label: '医药健康', img: 'health' },
                    { label: '全部分类', icon: Box },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
                        {item.icon ? <item.icon className="w-6 h-6 text-gray-400" /> : <img src={`https://picsum.photos/seed/mall_${item.img}/100/100`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
                      </div>
                      <span className="text-[10px] font-black text-gray-700">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promotional Banner */}
              <div className="px-4 mt-4">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-red-50 p-3">
                  <img src="https://picsum.photos/seed/promo/800/200" className="w-full h-16 object-cover rounded-xl" referrerPolicy="no-referrer" />
                </div>
              </div>

              {/* Limited Time Section */}
              <div className="px-4 mt-4">
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-black italic text-[#ff3d3d]">限时秒杀</span>
                      <div className="flex items-center gap-1 bg-[#fff0f0] text-[#ff3d3d] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        <span>限时抢</span>
                        <div className="flex gap-1 ml-1 text-white">
                          <span className="bg-[#ff3d3d] px-1 rounded">09</span> :
                          <span className="bg-[#ff3d3d] px-1 rounded">08</span> :
                          <span className="bg-[#ff3d3d] px-1 rounded">56</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold">更多 &gt;</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="flex flex-col gap-1">
                        <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
                          <img src={`https://picsum.photos/seed/item${i}/100/100`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {mallSubTab === 'mall-category' && (
            <div className="bg-white min-h-full flex flex-col">
              <div className="flex gap-4 px-4 py-3 overflow-x-auto no-scrollbar whitespace-nowrap border-b border-gray-50">
                {['休闲零食', '粮油调味', '酒水饮料', '个护清洁', '日用百货'].map((cat, i) => (
                  <div key={i} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${i === 0 ? 'bg-red-50 text-[#ff3d3d] border border-[#ff3d3d]' : 'bg-gray-50 text-gray-500'}`}>
                    {cat}
                  </div>
                ))}
              </div>

              <div className="flex-1 flex overflow-hidden">
                <div className="w-24 bg-gray-50 h-full overflow-y-auto no-scrollbar text-[11px] text-gray-500">
                  {['全部', '热销推荐', '藕粉/麦片/...', '咖啡', '坚果炒货', '饼干/膨化', '进口零食', '方便速食', '糖果', '巧克力'].map((cat, i) => (
                    <div key={i} className={`py-4 px-3 flex items-center gap-1 transition-all ${i === 0 ? 'bg-white text-gray-900 font-black border-l-4 border-red-500' : ''}`}>
                      {cat}
                    </div>
                  ))}
                </div>
                <div className="flex-1 h-full overflow-y-auto p-4 space-y-6">
                   <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold mb-4">
                     <span>热销推荐</span>
                     <div className="flex gap-4">
                       <span>销量 <ChevronRight className="w-2 h-2 inline-block rotate-90" /></span>
                       <span>价格 <ChevronRight className="w-2 h-2 inline-block rotate-90" /></span>
                       <span>新品</span>
                     </div>
                   </div>
                   {[1, 2, 3, 4, 5].map(i => (
                     <div key={i} className="flex gap-3 relative">
                     <div className="bg-red-600 text-white px-2 py-0.5 rounded-br-xl text-[10px] font-black absolute top-0 left-0 z-10 scale-90 origin-top-left">自营</div>
                     <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0 shadow-inner">
                       <img src={`https://picsum.photos/seed/catitem${i+20}/150/150`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                     </div>
                     <div className="flex-1 flex flex-col justify-between py-1">
                       <div className="space-y-1">
                         <p className="text-[13px] font-black text-gray-900 line-clamp-2 leading-snug">
                           <span className="bg-red-50 text-red-600 px-1 py-0.5 rounded text-[10px] mr-1 border border-red-100">超值</span>
                           三只松鼠 每日坚果 礼盒装 750g/箱
                         </p>
                         <div className="flex items-center gap-2">
                           <span className="text-[10px] text-gray-400 font-bold">1.2w+人评价</span>
                           <span className="text-[10px] text-orange-500 font-bold">99%好评</span>
                         </div>
                       </div>
                       <div className="flex justify-between items-end">
                         <div className="flex items-baseline text-[#ff3d3d] font-black italic">
                           <span className="text-[11px]">¥</span>
                           <span className="text-xl ml-0.5">88.00</span>
                           <span className="text-[10px] text-gray-300 line-through ml-1 font-normal not-italic">¥128</span>
                         </div>
                         <button className="bg-gradient-to-br from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-[10px] font-black active:scale-95 transition-all shadow-md shadow-red-100">马上抢</button>
                       </div>
                     </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {mallSubTab === 'mall-cart' && (
            <div className="bg-[#f7f7f7] min-h-full flex flex-col">
              <div className="bg-white py-4 px-4 shadow-sm sticky top-0 z-50">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-black italic text-[#ff3d3d]">购物车</h2>
                  <div className="flex-1 mx-4 flex items-center gap-1 text-[10px] text-gray-400">
                     <Circle className="w-3 h-3 fill-gray-400 text-gray-400" />
                     <span className="truncate">北京北京市东城区测试...</span>
                     <ChevronRight className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-bold text-gray-700">管理</span>
                </div>
                <div className="flex justify-between mt-4 text-[10px] text-gray-400">
                  <span className="flex items-center gap-1"><Circle className="w-2 h-2 text-green-500 fill-green-500" /> 100%正品保障</span>
                  <span className="flex items-center gap-1"><Circle className="w-2 h-2 text-orange-500 fill-orange-500" /> 所有商品精挑细选</span>
                  <span className="flex items-center gap-1"><Circle className="w-2 h-2 text-blue-500 fill-blue-500" /> 售后无忧</span>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="text-sm font-bold flex items-center gap-2">
                   <span className="text-gray-400">购物数量 (2)</span>
                </div>
                <div className="bg-white rounded-3xl p-4 flex gap-3 shadow-sm">
                   <div className="w-6 flex items-center">
                     <div className="w-5 h-5 rounded-full border-2 border-gray-100 flex items-center justify-center">
                       <div className="w-2.5 h-2.5 rounded-full bg-gray-50" />
                     </div>
                   </div>
                   <div className="w-24 h-24 rounded-2xl bg-gray-50 overflow-hidden shrink-0">
                      <img src="https://picsum.photos/seed/water/150/150" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                   </div>
                   <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div className="space-y-1">
                        <p className="text-sm font-black text-gray-800 line-clamp-2">怡宝 饮用纯净水 555ml*12</p>
                        <p className="text-[10px] text-gray-400">555ml*12</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-[#ff3d3d] font-black">
                          <span className="text-[10px]">¥</span>
                          <span className="text-base ml-0.5">16.80</span>
                        </div>
                        <div className="flex items-center bg-gray-50 rounded-full px-2 py-1 gap-3">
                          <span className="text-gray-300 font-black">-</span>
                          <span className="text-[10px] font-black">1</span>
                          <span className="text-gray-900 font-black">+</span>
                        </div>
                      </div>
                   </div>
                </div>
              </div>

              <div className="absolute bottom-24 left-0 right-0 bg-white border-t border-gray-100 p-4 flex items-center justify-between z-40">
                 <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-orange-500 flex items-center justify-center">
                       <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    </div>
                    <span className="text-xs font-bold">全选(0)</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="text-right">
                       <div className="text-xs font-bold flex items-baseline">
                         <span className="text-gray-900">到手价:</span>
                         <span className="text-[#ff3d3d] ml-1">¥</span>
                         <span className="text-xl text-[#ff3d3d] font-black">0.00</span>
                       </div>
                       <p className="text-[8px] text-gray-300 font-bold">共计优惠 0.00</p>
                    </div>
                    <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2.5 rounded-full font-black text-sm shadow-lg shadow-red-100">立即下单</button>
                 </div>
              </div>
            </div>
          )}

          {mallSubTab === 'mall-mine' && (
            <div className="bg-[#f7f7f7] min-h-full">
              <div className="bg-white py-8 px-6 rounded-b-[40px] shadow-sm relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-orange-50 rounded-full opacity-30 blur-3xl animate-pulse" />
                <div className="flex items-center justify-between mb-4">
                   <div />
                   <div className="bg-[#ffebed] px-3 py-1.5 rounded-full flex items-center gap-1 border border-red-100">
                     <div className="w-4 h-4 bg-orange-400 rounded flex items-center justify-center shadow-inner">
                       <div className="w-2 h-2 text-white text-[8px] font-black italic">!</div>
                     </div>
                     <span className="text-[10px] text-[#ff3d3d] font-black">我的饭卡 &gt;</span>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-50">
                    <img src="https://picsum.photos/seed/user/100/100" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900">a55ca3d8</h2>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[10px] bg-gray-100 text-gray-400 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        ID 13989850712 <ChevronRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -mt-6 left-4 right-4 bg-white rounded-[32px] p-5 shadow-xl border border-gray-50 z-20">
                 <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-black text-gray-900">订单中心</span>
                    <span className="text-[10px] text-gray-400 font-bold flex items-center">查看全部 <ChevronRight className="w-3 h-3" /></span>
                 </div>
                 <div className="flex justify-around items-center">
                    {[
                      { label: '待付款', icon: Wallet, color: 'text-green-500', bg: 'bg-green-50' },
                      { label: '待发货', icon: Package, color: 'text-orange-500', bg: 'bg-orange-50' },
                      { label: '待收货', icon: Truck, color: 'text-blue-500', bg: 'bg-blue-50' },
                      { label: '已完成', icon: CircleCheck, color: 'text-blue-400', bg: 'bg-blue-50' },
                      { label: '售后/退款', icon: Heart, color: 'text-red-400', bg: 'bg-red-50' },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-2xl ${item.bg} flex items-center justify-center shadow-sm`}>
                          <item.icon className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <span className="text-[10px] font-black text-gray-600">{item.label}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="mt-40 px-4">
                 <div className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-50">
                    <div className="mb-6">
                       <span className="text-sm font-black text-gray-900">我的服务</span>
                    </div>
                    <div className="grid grid-cols-4 gap-y-6">
                       {[
                         { label: '地址管理', icon: MapPin },
                         { label: '联系客服', icon: Headset },
                         { label: '优惠券', icon: Ticket },
                         { label: '我的收藏', icon: Star },
                       ].map((item, i) => (
                         <div key={i} className="flex flex-col items-center gap-2">
                            <div className="w-6 h-6 text-gray-800">
                              <item.icon className="w-full h-full" />
                            </div>
                            <span className="text-[11px] font-black text-gray-600">{item.label}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Sub Mall Tab Bar - Positioned at bottom to cover main tab bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 h-24 flex items-center justify-around pb-6 px-4 shadow-[0_-8px_15px_-3px_rgba(0,0,0,0.1)] z-50">
           {[
             { id: 'mall-home', icon: Home, label: '首页' },
             { id: 'mall-category', icon: Users, label: '分类' },
             { id: 'mall-cart', icon: ShoppingCart, label: '购物车' },
             { id: 'mall-mine', icon: User, label: '我的' },
           ].map(tb => (
             <button 
               key={tb.id} 
               onClick={() => setMallSubTab(tb.id)}
               className={`flex flex-col items-center gap-0.5 flex-1 transition-all ${mallSubTab === tb.id ? 'text-[#ff3d3d] scale-105' : 'text-gray-300'}`}
             >
               <tb.icon className="w-4 h-4" />
               <span className="text-[10px] font-black">{tb.label}</span>
             </button>
           ))}
        </div>
      </div>
  </div>
);

export default function App() {
  const [MOCK_CARDS, setMOCK_CARDS] = useState<MealCard[]>(() => {
    const saved = localStorage.getItem('mock_cards_v6');
    if (saved) return JSON.parse(saved);
    return INITIAL_MOCK_CARDS;
  });
  const [defaultCardId, setDefaultCardId] = useState<string>(() => {
    return localStorage.getItem('default_card_id_v6') || INITIAL_MOCK_CARDS[0].id;
  });

  const [activeTab, setActiveTab] = useState('home');
  const [mallSubTab, setMallSubTab] = useState('mall-home');
  const [selectedMallCardIndex, setSelectedMallCardIndex] = useState(0);
  const [isMallCardBottomSheetOpen, setIsMallCardBottomSheetOpen] = useState(false);
  const [showMiniProgramModal, setShowMiniProgramModal] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(() => {
    const savedCards = localStorage.getItem('mock_cards_v6');
    const cards = savedCards ? JSON.parse(savedCards) : INITIAL_MOCK_CARDS;
    const defId = localStorage.getItem('default_card_id_v6') || INITIAL_MOCK_CARDS[0].id;
    return Math.max(0, cards.findIndex((c: any) => c.id === defId));
  });
  const [pendingCardIndex, setPendingCardIndex] = useState<number | null>(null);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [selectedPayCard, setSelectedPayCard] = useState<MealCard>(() => {
    const savedCards = localStorage.getItem('mock_cards_v6');
    const cards = savedCards ? JSON.parse(savedCards) : INITIAL_MOCK_CARDS;
    const defId = localStorage.getItem('default_card_id_v6') || INITIAL_MOCK_CARDS[0].id;
    const defaultCard = cards.find((c: any) => c.id === defId);
    if (defaultCard && defaultCard.allowedTabs.includes('pay')) return defaultCard;
    return cards.find((c: any) => c.allowedTabs.includes('pay')) || cards[0];
  });
  const [payType, setPayType] = useState<'canteen' | 'store'>('canteen');
  const [isMallLoading, setIsMallLoading] = useState(false);
  const [mineSubTab, setMineSubTab] = useState<'main' | 'transactions' | 'topup' | 'family' | 'password' | 'preferences'>('main');
  const [historyFilterCardId, setHistoryFilterCardId] = useState<string>('all');
  const [historyFilterChannel, setHistoryFilterChannel] = useState<string>('all');
  const [topupFilterCardId, setTopupFilterCardId] = useState<string>('all');
  const [topupFilterMethod, setTopupFilterMethod] = useState<string>('all');
  const [isPayCardBottomSheetOpen, setIsPayCardBottomSheetOpen] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    localStorage.setItem('mock_cards_v6', JSON.stringify(MOCK_CARDS));
  }, [MOCK_CARDS]);

  useEffect(() => {
    localStorage.setItem('default_card_id_v6', defaultCardId);
  }, [defaultCardId]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollRef });
  
  const headerBg = useTransform(scrollY, [0, 60], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]);
  const headerTextColor = useTransform(scrollY, [0, 60], ["#ffffff", "#000000"]);
  const capsuleBg = useTransform(scrollY, [0, 60], ["rgba(0, 0, 0, 0.15)", "rgba(255, 255, 255, 0.8)"]);
  const capsuleBorder = useTransform(scrollY, [0, 60], ["rgba(255, 255, 255, 0.2)", "rgba(0, 0, 0, 0.08)"]);
  const capsuleIconColor = useTransform(scrollY, [0, 60], ["#ffffff", "#000000"]);

  const cardScrollRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);

  // Filter products based on active card
  const activeEnterpriseId = MOCK_CARDS[activeCardIndex].id;
  const filteredProducts = MOCK_PRODUCTS.filter(p => p.enterpriseId === activeEnterpriseId);

  // Sync scroll position when activeCardIndex changes
  useEffect(() => {
    if (activeTab === 'home' && cardScrollRef.current) {
      const container = cardScrollRef.current;
      const targetCard = container.children[activeCardIndex] as HTMLElement;
      if (targetCard) {
        isProgrammaticScroll.current = true;
        targetCard.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
        // Reset flag after animation
        setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 600);
      }
    }
  }, [activeCardIndex, activeTab]);

  // Sync mall card with main card when entering mall if needed or just keep initial
  useEffect(() => {
    if (activeTab === 'mall') {
      setSelectedMallCardIndex(activeCardIndex);
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'pay') {
      setSelectedPayCard(MOCK_CARDS[activeCardIndex] || MOCK_CARDS[0]);
    }
  }, [activeTab, activeCardIndex, MOCK_CARDS]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % MOCK_BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // WeChat Style Header Component
  const WeChatHeaderWrapper = (props: any) => (
    <WeChatHeader 
      {...props} 
      headerBg={headerBg} 
      headerTextColor={headerTextColor} 
      capsuleBg={capsuleBg} 
      capsuleBorder={capsuleBorder} 
      capsuleIconColor={capsuleIconColor}
      setActiveTab={setActiveTab}
    />
  );

  const handleCardClick = (idx: number) => {
    if (idx === activeCardIndex) return;
    setPendingCardIndex(idx);
    setShowSwitchModal(true);
  };

  const confirmSwitch = () => {
    if (pendingCardIndex !== null) {
      setActiveCardIndex(pendingCardIndex);
    }
    setShowSwitchModal(false);
    setPendingCardIndex(null);
  };

  const cancelSwitch = () => {
    setShowSwitchModal(false);
    setPendingCardIndex(null);
    if (cardScrollRef.current) {
      const container = cardScrollRef.current;
      const targetCard = container.children[activeCardIndex] as HTMLElement;
      if (targetCard) {
        isProgrammaticScroll.current = true;
        targetCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        setTimeout(() => { isProgrammaticScroll.current = false; }, 600);
      }
    }
  };

  const handleScroll = (e: any) => {
    const container = e.currentTarget;
    const cardWidth = container.offsetWidth * 0.85 + 12;
    const newIndex = Math.round(container.scrollLeft / cardWidth);
    if (newIndex !== activeCardIndex && !showSwitchModal && pendingCardIndex === null) {
      setPendingCardIndex(newIndex);
      setShowSwitchModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-sans text-gray-900 max-w-md mx-auto shadow-2xl relative overflow-hidden h-screen">
      <div className="flex-1 relative h-full overflow-hidden">
        {activeTab === 'home' && (
          <HomePage
            scrollRef={scrollRef}
            currentBanner={currentBanner}
            MOCK_BANNERS={MOCK_BANNERS}
            activeCardIndex={activeCardIndex}
            MOCK_CARDS={MOCK_CARDS}
            handleCardClick={handleCardClick}
            setSelectedPayCard={setSelectedPayCard}
            setActiveTab={setActiveTab}
            filteredProducts={filteredProducts}
            isMallLoading={isMallLoading}
            setShowMiniProgramModal={setShowMiniProgramModal}
            cardScrollRef={cardScrollRef}
            WeChatHeaderWrapper={WeChatHeaderWrapper}
            handleScroll={handleScroll}
          />
        )}
        {activeTab === 'pay' && (
          <PayPage
            setActiveTab={setActiveTab}
            selectedPayCard={selectedPayCard}
            setSelectedPayCard={setSelectedPayCard}
            setIsPayCardBottomSheetOpen={setIsPayCardBottomSheetOpen}
            payType={payType}
            setPayType={setPayType}
            WeChatHeaderWrapper={WeChatHeaderWrapper}
          />
        )}
        {activeTab === 'mine' && (
          <MinePage 
            activeCardIndex={activeCardIndex}
            setActiveCardIndex={setActiveCardIndex}
            mineSubTab={mineSubTab}
            setMineSubTab={setMineSubTab}
            setActiveTab={setActiveTab}
            historyFilterCardId={historyFilterCardId}
            setHistoryFilterCardId={setHistoryFilterCardId}
            historyFilterChannel={historyFilterChannel}
            setHistoryFilterChannel={setHistoryFilterChannel}
            topupFilterCardId={topupFilterCardId}
            setTopupFilterCardId={setTopupFilterCardId}
            topupFilterMethod={topupFilterMethod}
            setTopupFilterMethod={setTopupFilterMethod}
            MOCK_CARDS={MOCK_CARDS}
            setMOCK_CARDS={setMOCK_CARDS}
            defaultCardId={defaultCardId}
            setDefaultCardId={setDefaultCardId}
            headerBg={headerBg}
            headerTextColor={headerTextColor}
            capsuleBg={capsuleBg}
            capsuleBorder={capsuleBorder}
            capsuleIconColor={capsuleIconColor}
          />
        )}
        {activeTab === 'mall' && (
          <MallPage
            setActiveTab={setActiveTab}
            mallSubTab={mallSubTab}
            setMallSubTab={setMallSubTab}
            selectedMallCardIndex={selectedMallCardIndex}
            setIsMallCardBottomSheetOpen={setIsMallCardBottomSheetOpen}
            activeCardIndex={activeCardIndex}
            isMallLoading={isMallLoading}
            filteredProducts={filteredProducts}
            scrollRef={scrollRef}
            MOCK_CARDS={MOCK_CARDS}
          />
        )}
      </div>

      <AnimatePresence>
        {showSwitchModal && pendingCardIndex !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={cancelSwitch} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white w-full max-w-xs rounded-[32px] overflow-hidden shadow-2xl relative z-10">
              <div className="p-8 text-center">
                <div className={`w-16 h-16 ${MOCK_CARDS[pendingCardIndex].color} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg`}>
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">切换企业卡片？</h3>
                <p className="text-sm text-gray-500 leading-relaxed">即将切换至 <span className="font-bold text-gray-800">[{MOCK_CARDS[pendingCardIndex].title}]</span>，下方的内容将随之改变。</p>
              </div>
              <div className="flex border-t border-gray-100">
                <button onClick={cancelSwitch} className="flex-1 py-5 text-sm font-bold text-gray-400 hover:bg-gray-50 transition-colors">取消</button>
                <div className="w-px bg-gray-100" />
                <button onClick={confirmSwitch} className="flex-1 py-5 text-sm font-bold text-blue-600 hover:bg-gray-50 transition-colors">确定切换</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMiniProgramModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMiniProgramModal(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 10 }} className="bg-white/95 backdrop-blur-xl w-full max-w-[280px] rounded-[32px] overflow-hidden shadow-2xl p-6 relative z-10 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center"><Truck className="w-8 h-8 text-blue-600" /></div>
              <div className="space-y-1">
                <p className="text-base font-black text-gray-900">联华鲸选到家</p>
                <p className="text-xs text-gray-400 font-bold leading-relaxed px-4">即将打开联华鲸选到家小程序，是否继续？</p>
              </div>
              <div className="w-full flex flex-col gap-2 mt-2">
                <button onClick={() => setShowMiniProgramModal(false)} className="w-full bg-blue-600 text-white py-3 rounded-2xl font-black text-sm active:scale-95 transition-transform">继续前往</button>
                <button onClick={() => setShowMiniProgramModal(false)} className="w-full text-gray-400 py-2 rounded-2xl font-black text-xs active:scale-95 transition-transform">暂不需要</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPayCardBottomSheetOpen && (
          <div className="fixed inset-0 z-[200] flex items-end justify-center px-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsPayCardBottomSheetOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="bg-white w-full max-w-md rounded-t-[40px] overflow-hidden shadow-2xl relative z-10 p-6 font-sans mb-0">
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
              <h3 className="text-lg font-black text-center mb-6">切换付款饭卡</h3>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 pb-24 no-scrollbar">
                {MOCK_CARDS.filter(c => c.allowedTabs.includes('pay')).map((card) => (
                  <button key={card.id} onClick={() => { setSelectedPayCard(card); setIsPayCardBottomSheetOpen(false); }} className={`w-full p-5 rounded-3xl flex items-center justify-between border-2 transition-all ${selectedPayCard.id === card.id ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-gray-50 bg-gray-50/50 grayscale opacity-80'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-8 rounded-lg ${card.color} shadow-sm`} />
                      <div className="text-left font-black">
                        <p className="text-sm text-gray-900">{card.title}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{card.cardId}</p>
                      </div>
                    </div>
                    {selectedPayCard.id === card.id && <CircleCheck className="w-5 h-5 text-blue-600" />}
                  </button>
                ))}
              </div>
              <button onClick={() => setIsPayCardBottomSheetOpen(false)} className="w-full mt-6 py-4 rounded-3xl bg-gray-900 text-white font-black text-sm active:scale-95 transition-transform">取消</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMallCardBottomSheetOpen && (
          <div className="fixed inset-0 z-[200] flex items-end justify-center px-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMallCardBottomSheetOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="bg-white w-full max-w-md rounded-t-[40px] overflow-hidden shadow-2xl relative z-10 p-6 font-sans mb-0">
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
              <h3 className="text-lg font-black text-center mb-6">切换商城消费卡</h3>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 pb-24 no-scrollbar">
                {MOCK_CARDS.filter(c => c.allowedChannels.includes('mall')).map((card) => {
                  const originalIndex = MOCK_CARDS.findIndex(c => c.id === card.id);
                  return (
                    <button key={card.id} onClick={() => { setSelectedMallCardIndex(originalIndex); setIsMallCardBottomSheetOpen(false); }} className={`w-full p-5 rounded-3xl flex items-center justify-between border-2 transition-all ${selectedMallCardIndex === originalIndex ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-gray-50 bg-gray-50/50 grayscale opacity-80'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-8 rounded-lg ${card.color} shadow-sm`} />
                        <div className="text-left font-black">
                          <p className="text-sm text-gray-900">{card.title}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{card.cardId}</p>
                        </div>
                      </div>
                      {selectedMallCardIndex === originalIndex && <CircleCheck className="w-5 h-5 text-blue-600" />}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => setIsMallCardBottomSheetOpen(false)} className="w-full mt-6 py-4 rounded-3xl bg-gray-900 text-white font-black text-sm active:scale-95 transition-transform">取消</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation - Hidden on secondary pages and in Mall tab */}
      {((activeTab !== 'mine' || mineSubTab === 'main') && activeTab !== 'mall') && (
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 h-24 flex items-center justify-around px-2 pb-6 z-40">
          {MOCK_CARDS[activeCardIndex].allowedTabs.map(tabId => {
            const isBigPay = tabId === 'pay' && 
                            (MOCK_CARDS[activeCardIndex].allowedTabs.length === 5 || 
                            MOCK_CARDS[activeCardIndex].allowedTabs.length === 3);
            
            if (tabId === 'home') return (
              <button key="home" onClick={() => setActiveTab('home')} className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all ${activeTab === 'home' ? 'text-blue-600 scale-105' : 'text-gray-400'}`}>
                <Home className="w-5 h-5" /><span className="text-[9px] font-bold">首页</span>
              </button>
            );
            if (tabId === 'jingxuan') return (
              <button key="jingxuan" onClick={() => setShowMiniProgramModal(true)} className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all ${activeTab === 'jingxuan' ? 'text-blue-600 scale-105' : 'text-gray-400'}`}>
                <Truck className="w-5 h-5" /><span className="text-[9px] font-bold">鲸选</span>
              </button>
            );
            if (tabId === 'pay') {
              if (isBigPay) {
                return (
                  <div key="pay" className="flex-1 flex justify-center -mt-12 relative">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} onClick={() => setActiveTab('pay')} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 border-white transition-all ${activeTab === 'pay' ? 'bg-blue-600 shadow-blue-300' : 'bg-blue-600 shadow-blue-200'}`}>
                      <QrCode className="w-8 h-8 text-white" />
                    </motion.button>
                    <span className={`absolute -bottom-6 text-[9px] font-bold ${activeTab === 'pay' ? 'text-blue-600' : 'text-gray-400'}`}>付款</span>
                  </div>
                );
              } else {
                return (
                  <button key="pay" onClick={() => setActiveTab('pay')} className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all ${activeTab === 'pay' ? 'text-blue-600 scale-105' : 'text-gray-400'}`}>
                    <QrCode className="w-5 h-5" /><span className="text-[9px] font-bold">付款</span>
                  </button>
                );
              }
            }
            if (tabId === 'mall') return (
              <button key="mall" onClick={() => setActiveTab('mall')} className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all ${activeTab === 'mall' ? 'text-blue-600 scale-105' : 'text-gray-400'}`}>
                <ShoppingCart className="w-5 h-5" /><span className="text-[9px] font-bold">商城</span>
              </button>
            );
            if (tabId === 'mine') return (
              <button key="mine" onClick={() => setActiveTab('mine')} className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all ${activeTab === 'mine' ? 'text-blue-600 scale-105' : 'text-gray-400'}`}>
                <User className="w-5 h-5" /><span className="text-[9px] font-bold">我的</span>
              </button>
            );
            return null;
          })}
        </div>
      )}
    </div>
  );
}
