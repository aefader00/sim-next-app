import { notFound } from "next/navigation";
import { getThursday } from "@/actions/thursdays";
import ProductionCard from "@/components/domain/thursdays/ProductionCard";
import { normalizeThursdayName } from "@/helpers";
import styles from "@/components/domain/thursdays/ThursdayPage.module.css";

interface ThursdayDetailContentProps {
  thursdayId: string;
}

export default async function ThursdayDetailContent({ thursdayId }: ThursdayDetailContentProps) {
  const result = await getThursday(thursdayId);
  if (!result.success) notFound();

  const thursday = result.data;
  const thursdayName = normalizeThursdayName(thursday.name);
  const formattedDate = new Date(thursday.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={styles.detailBody}>
      <div className={styles.detailMeta}>
        <h3 className={styles.detailTitle}>{thursdayName}</h3>
        <span className={styles.detailDate}>{formattedDate}</span>
      </div>
      {thursday.productions.length > 0 ? (
        thursday.productions.map((production: any, index: number) => (
          <ProductionCard
            key={production.id}
            thursday={thursday as any}
            production={production}
            productionIndex={index}
            productionCount={thursday.productions.length}
          />
        ))
      ) : (
        <p className={styles.NoProductions}>No productions scheduled on this Thursday yet.</p>
      )}
    </div>
  );
}
