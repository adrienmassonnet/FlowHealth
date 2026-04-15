import { getSavingsSupplements, getProductMeta } from '@/lib/content';
import SavingsBreakdownClient from './SavingsBreakdownClient';

export default async function SavingsBreakdown() {
  const [supplements, meta] = await Promise.all([getSavingsSupplements(), getProductMeta()]);
  const flowPrice = meta.priceSubscriptionCHF;
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
      pricePerServing={meta.pricePerServingSingleCHF}
      activeIngredients={meta.activeIngredients}
      servingsPerBox={meta.servingsPerBox}
    />
  );
}
