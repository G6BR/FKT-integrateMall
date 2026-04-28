/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  tag?: string;
}

export interface MealCard {
  id: string;
  title: string;
  balance: number | null;
  unitName: string;
  cardId: string;
  color: string;
  allowedChannels: string[];
  allowedTabs: string[];
  isSubCard?: boolean;
  primaryUserPhone?: string;
  subCardIds?: string[];
  userPhone?: string;
}

export interface Banner {
  id: string;
  imageUrl: string;
  link: string;
  title: string;
}

export interface Transaction {
  id: string;
  cardId: string; // References MealCard.id
  channel: string;
  amount: number;
  time: string;
  type: 'payment' | 'refund';
}

export interface TopUpRecord {
  id: string;
  cardId: string;
  amount: number;
  time: string;
  type: 'topup' | 'deduction';
  method: '兑换卡充值' | '中台充值' | '企业系统充值' | '微信充值' | '系统扣减';
}

export interface ConsumptionChannel {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'internal' | 'external' | 'banner';
  link?: string;
  badge?: string;
}
