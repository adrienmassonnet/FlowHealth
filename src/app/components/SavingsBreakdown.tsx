import { getSavingsSupplements } from '@/lib/contentful';
import { PRODUCT_META } from '@/lib/product-meta';
import SavingsBreakdownClient from './SavingsBreakdownClient';

const flowPrice = PRODUCT_META.priceSingleCHF;

export default async function SavingsBreakdown() {
  const supplements = await getSavingsSupplements();
  const traditionalTotal = Math.round(supplements.reduce((sum, s) => sum + s.monthlyPriceCHF, 0) * 100) / 100;
  const savings = Math.round((traditionalTotal - flowPrice) * 100) / 100;
  const savingsRounded = Math.round(savings);

  return (
    <SavingsBreakdownClient
      supplements={supplements}
      flowPrice={flowPrice}
      traditionalTotal={traditionalTotal}
      savings={savings}
      savingsRounded={savingsRounded}
    />
  );
}
