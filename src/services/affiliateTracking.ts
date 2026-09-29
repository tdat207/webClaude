import { AffiliateClickRecord, ClothingItem } from '../types';
import { generateId } from '../lib/utils';

const STORAGE_KEY = 'fashion3d_affiliate_clicks';

export function getAffiliateClicks(): AffiliateClickRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read affiliate clicks from localStorage', e);
    return [];
  }
}

export function trackAffiliateClick(
  product: ClothingItem,
  source: AffiliateClickRecord['source'] = 'fitting_page'
): AffiliateClickRecord {
  const record: AffiliateClickRecord = {
    id: generateId(),
    productId: product.id,
    productName: product.name,
    brand: product.brand,
    price: product.price,
    merchantName: product.merchantName,
    timestamp: Date.now(),
    source,
  };

  try {
    const existing = getAffiliateClicks();
    const updated = [record, ...existing];
    // Keep max 500 recent clicks
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 500)));
  } catch (e) {
    console.error('Failed to save affiliate click', e);
  }

  return record;
}

export function openAffiliateLink(
  product: ClothingItem,
  source: AffiliateClickRecord['source'] = 'fitting_page'
): void {
  trackAffiliateClick(product, source);
  window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
}

export interface AffiliateStats {
  totalClicks: number;
  totalEstimatedGMV: number;
  totalEstimatedCommission: number; // Assuming ~8% average affiliate commission
  clicksByProduct: { [productId: string]: { product: string; brand: string; count: number; gmv: number } };
  clicksByMerchant: { [merchant: string]: number };
  recentClicks: AffiliateClickRecord[];
}

export function getAffiliateStats(): AffiliateStats {
  const clicks = getAffiliateClicks();
  let totalGMV = 0;
  const clicksByProduct: AffiliateStats['clicksByProduct'] = {};
  const clicksByMerchant: AffiliateStats['clicksByMerchant'] = {};

  clicks.forEach((c) => {
    totalGMV += c.price;
    if (!clicksByProduct[c.productId]) {
      clicksByProduct[c.productId] = {
        product: c.productName,
        brand: c.brand,
        count: 0,
        gmv: 0,
      };
    }
    clicksByProduct[c.productId].count += 1;
    clicksByProduct[c.productId].gmv += c.price;

    clicksByMerchant[c.merchantName] = (clicksByMerchant[c.merchantName] || 0) + 1;
  });

  return {
    totalClicks: clicks.length,
    totalEstimatedGMV: totalGMV,
    totalEstimatedCommission: Math.round(totalGMV * 0.08),
    clicksByProduct,
    clicksByMerchant,
    recentClicks: clicks.slice(0, 20),
  };
}

export function clearAffiliateHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear affiliate history', e);
  }
}
