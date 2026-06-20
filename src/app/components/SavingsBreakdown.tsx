import { getSavingsSupplements, getProductMeta, getComparisonRows } from '@/lib/content';
import SavingsBreakdownClient from './SavingsBreakdownClient';

export default async function SavingsBreakdown() {
  const [supplements, meta, rawRows] = await Promise.all([getSavingsSupplements(), getProductMeta(), getComparisonRows()]);
  const flowPrice = meta.priceSubscriptionCHF;
  const traditionalTotal = Math.round(supplements.reduce((sum, s) => sum + s.monthlyPriceCHF, 0) * 100) / 100;
  const savings = Math.round((traditionalTotal - flowPrice) * 100) / 100;
  const comparisonRows = rawRows.map((row) => ({
    ...row,
    feature: row.feature.replace(/\{active_ingredients\}/g, String(meta.activeIngredients)),
  }));

  return (
    <SavingsBreakdownClient
      supplements={supplements}
      flowPrice={flowPrice}
      traditionalTotal={traditionalTotal}
      savings={savings}
      servingsPerBox={meta.servingsPerBox}
      pricePerServing={meta.pricePerServingSingleCHF}
      activeIngredients={meta.activeIngredients}
      comparisonRows={comparisonRows}
    />
  );
}
