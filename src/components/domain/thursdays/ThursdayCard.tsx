import styles from "@/components/domain/thursdays/ThursdayCard.module.css";
import { Button } from "@/components/ui/AntD";
import ProductionsCollapse from "@/components/domain/thursdays/ProductionsCollapse";
import { auth } from "@/authentication";
import { normalizeThursdayName } from "@/helpers";

import { Prisma } from "@prisma/client";

type ThursdayWithProductions = Prisma.ThursdayGetPayload<{
  include: {
    productions: {
      include: {
        producers: { select: { id: true; name: true; image: true } };
        presentations: {
          include: {
            presenters: { select: { id: true; name: true; image: true } };
          };
        };
      };
    };
  };
}>;

interface ThursdayCardProps {
  thursday: ThursdayWithProductions;
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

function formatSummaryLabel(label: string, index: number, count: number) {
  return count > 1 ? `${formatOrdinal(index + 1)} ${label}` : label;
}

export default async function ThursdayCard({
  thursday,
  isAdmin: initialIsAdmin,
}: ThursdayCardProps) {
  let isAdmin = initialIsAdmin;
  if (isAdmin === undefined) {
    const session = await auth();
    isAdmin = session?.user?.role === "ADMIN";
  }
  const formattedDate = new Date(thursday.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const thursdayName = normalizeThursdayName(thursday.name);

  return (
    <ProductionsCollapse
      productions={[{
        id: thursday.id,
        name: thursdayName,
        href: `/thursdays/${thursday.id}`,
        date: formattedDate,
        extra: isAdmin ? (
          <Button href={`/thursdays/${thursday.id}/edit`}>
            Edit
          </Button>
        ) : undefined,
        content: (
          <>
            {thursday.productions.length > 0 ? (
              <div className={styles.DaySummary}>
                {thursday.productions.map((production: any, productionIndex: number) => (
                  <div key={production.id} className={styles.DaySummaryRow}>
                    <div className={styles.DaySummaryColumn}>
                      <h3 className={styles.DaySummaryItem}>
                        <span className="section-label">
                          {formatSummaryLabel("Production", productionIndex, thursday.productions.length)}:
                        </span>
                        <span>{production.name}</span>
                      </h3>
                    </div>

                    <div className={styles.DaySummaryColumn}>
                      {production.presentations.length > 0 ? (
                        production.presentations.map((presentation: any, presentationIndex: number) => (
                          <h3 key={presentation.id} className={styles.DaySummaryItem}>
                            <span className="section-label">
                              {formatSummaryLabel("Presentation", presentationIndex, production.presentations.length)}:
                            </span>
                            <span>{presentation.name}</span>
                          </h3>
                        ))
                      ) : (
                        <span className={styles.EmptyLabel}>No current presentations</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <span className={styles.EmptyLabel}>
                No current productions
              </span>
            )}
          </>
        ),
      }]}
    />
  );
}
