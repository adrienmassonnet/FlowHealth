import { getComparisonRows, getProductMeta } from '@/lib/content';
import ComparisonTableClient from './ComparisonTableClient';

function interpolate(text: string, meta: { activeIngredients: number }) {
  return text.replace(/\{active_ingredients\}/g, String(meta.activeIngredients));
}

export default async function ComparisonTable() {
  const [rows, meta] = await Promise.all([getComparisonRows(), getProductMeta()]);

  const interpolatedRows = rows.map((row) => ({
    ...row,
    feature: interpolate(row.feature, meta),
  }));

  return <ComparisonTableClient interpolatedRows={interpolatedRows} />;
}
