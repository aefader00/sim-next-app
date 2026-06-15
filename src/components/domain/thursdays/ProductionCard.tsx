import styles from "@/components/domain/thursdays/ThursdayCard.module.css";
import PersonLink from "@/components/ui/PersonLink";
import PresentationCard from "@/components/domain/thursdays/PresentationCard";

interface ProductionCardProps {
  thursday: any;
  production: any;
  productionIndex?: number;
  productionCount?: number;
  isAdmin?: boolean;
}

function formatOrdinal(value: number) {
  const remainder = value % 100;
  if (remainder >= 11 && remainder <= 13) return `${value}th`;

  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
}

export default async function ProductionCard({
  thursday,
  production,
  productionIndex = 0,
  productionCount = 1,
  isAdmin = false,
}: ProductionCardProps) {
  const producers = production.producers.filter(
    (user: any) => user.role !== "ADMIN",
  );
  const faculty = production.producers.filter(
    (user: any) => user.role === "ADMIN",
  );
  const formattedDate = new Date(thursday.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const productionTitle =
    productionCount > 1 ? `${formatOrdinal(productionIndex + 1)} Production` : "Production";

  return (
    <div className={styles.ProductionCardBody}>
      <div className={styles.ProductionSection}>
        <h3 className={styles.SectionTitle}>{productionTitle}</h3>
        <div className={styles.People}>
          <div className={styles.ProductionMeta}>
            <div className={styles.MetaItem}>
              <b>Name</b>
              <div className={styles.MetaValue}>{production.name}</div>
            </div>
            <div className={styles.MetaItem}>
              <b>Location</b>
              <div className={styles.MetaValue}>{production.location}</div>
            </div>
            <div className={styles.MetaItem}>
              <b>Date</b>
              <div className={styles.MetaValue}>{formattedDate}</div>
            </div>
          </div>
          <div>
            <b>Producers</b>
            <div className={styles.Names}>
              {producers.length > 0 ? (
                producers.map((producer: any) => (
                  <PersonLink key={producer.id} userId={producer.id} className={styles.PersonLink}>
                    {producer.name}
                  </PersonLink>
                ))
              ) : (
                <i>No producers credited yet.</i>
              )}
            </div>
          </div>
          <div>
            <b>Faculty</b>
            <div className={styles.Names}>
              {faculty.length > 0 ? (
                faculty.map((facultyMember: any) => (
                  <PersonLink key={facultyMember.id} userId={facultyMember.id} className={styles.PersonLink}>
                    {facultyMember.name}
                  </PersonLink>
                ))
              ) : (
                <i>No faculty assigned yet.</i>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.ProductionDivider} />

      <div>
        <span className={`ui-label ${styles.PresentationsLabel}`}>Presentations</span>
        <div style={{ marginTop: "0.5rem" }}>
          {production.presentations.length > 0 ? (
            production.presentations.map((presentation: any) => (
              <PresentationCard
                key={presentation.id}
                presentation={presentation}
              />
            ))
          ) : (
            <p>
              <i>No presentations for this production yet.</i>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
