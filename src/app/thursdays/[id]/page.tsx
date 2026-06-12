import { notFound } from "next/navigation";

import { getThursday, getAdjacentThursdays } from "@/actions/thursdays";
import { getAuthSession } from "@/actions/auth";

import ThursdayNavigation from "@/components/domain/thursdays/ThursdayNavigation";
import ProductionCard from "@/components/domain/thursdays/ProductionCard";
import ProductionsCollapse from "@/components/domain/thursdays/ProductionsCollapse";
import Split from "@/components/ui/Split";
import { Button } from "@/components/ui/AntD";
import { normalizeThursdayName } from "@/helpers";
import styles from "@/components/domain/thursdays/ThursdayPage.module.css";

interface ThursdayProps {
  params: Promise<{ id: string }>;
}

function formatSemesterCode(name?: string | null) {
  if (!name) return "";

  const code = name.match(/^(SP|FA)\d{2}$/i);
  if (code) return name.toUpperCase();

  const namedSemester = name.match(/^(Spring|Fall)\s+(\d{4})$/i);
  if (namedSemester) {
    const term = namedSemester[1].toLowerCase() === "spring" ? "SP" : "FA";
    return `${term}${namedSemester[2].slice(-2)}`;
  }

  return name;
}

export default async function Thursday({ params }: ThursdayProps) {
  const { id } = await params;
  const result = await getThursday(id);

  if (!result.success) {
    notFound();
  }
  const thursday = result.data;

  const { isAdmin } = await getAuthSession();

  const adjacentResult = await getAdjacentThursdays(id);
  const { previous, next } = adjacentResult.success
    ? adjacentResult.data
    : { previous: null, next: null };
  const semesterCode = formatSemesterCode((thursday as any).semester?.name);
  const thursdayName = normalizeThursdayName(thursday.name);
  const pageTitle = [semesterCode, "Thursday"].filter(Boolean).join(", ");
  const formattedDate = new Date(thursday.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Split
        start={<h2 style={{ margin: 0 }}>{pageTitle}</h2>}
        end={
          isAdmin && (
            <Button href={`/thursdays/${thursday.id}/edit`}>
              Edit Thursday
            </Button>
          )
        }
      />

      <ThursdayNavigation previous={previous} next={next} />

      <div className={styles.productions}>
        {thursday.productions.length > 0 ? (
          <ProductionsCollapse
            productions={[{
              id: thursday.id,
              name: thursdayName,
              date: formattedDate,
              content: (
                <>
                  {thursday.productions.map((production: any, index: number) => (
                    <ProductionCard
                      key={production.id}
                      thursday={thursday as any}
                      production={production}
                      productionIndex={index}
                      productionCount={thursday.productions.length}
                      isAdmin={isAdmin}
                    />
                  ))}
                </>
              ),
            }]}
          />
        ) : (
          <div className={styles.NoProductions}>
            There are no productions scheduled on this Thursday yet.
          </div>
        )}
      </div>
    </>
  );
}
