import { Suspense } from "react";
import styles from "@/components/domain/thursdays/Thursdays.module.css";
import { Button } from "@/components/ui/AntD";
import Split from "@/components/ui/Split";
import { getFilteredThursdays } from "@/actions/thursdays";
import { getAllSemesters } from "@/actions/semesters";
import { auth } from "@/authentication";
import { FilterInput, FilterSelect } from "@/components/ui/Filters";
import ResultsContainer from "@/components/ui/ResultsContainer";
import ThursdayCard from "@/components/domain/thursdays/ThursdayCard";

interface ThursdaysProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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

async function ThursdaysList({
  filters,
  isAdmin,
  semesters,
}: {
  filters: any;
  isAdmin: boolean;
  semesters: any[];
}) {
  const thursdaysResult = await getFilteredThursdays(filters);
  const thursdays = thursdaysResult.success ? thursdaysResult.data : [];

  if (thursdays.length < 1) {
    const semesterName = semesters.find(s => s.id === filters.semesterId)?.name || filters.semesterId || "this semester";
    return <>There are no results for {semesterName}.</>;
  }

  return (
    <div className={styles.ThursdaysGrid}>
      {thursdays.map((thursday: any) => (
        <ThursdayCard key={thursday.id} thursday={thursday} isAdmin={isAdmin} />
      ))}
    </div>
  );
}

export default async function Thursdays({ searchParams }: ThursdaysProps) {
  const filters = await searchParams;
  const semestersResult = await getAllSemesters();
  const semesters = semestersResult.success ? semestersResult.data : [];
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";

  const semesterIdParam = Array.isArray(filters.semesterId)
    ? filters.semesterId[0]
    : filters.semesterId;
  const semesterParam = Array.isArray(filters.semester)
    ? filters.semester[0]
    : filters.semester;
  const semesterIdFilter = semesterIdParam || semesterParam;
  const defaultSemesterId = semesters[0]?.id || null;
  const selectedSemesterId = semesterIdFilter || defaultSemesterId;
  const selectedSemester = semesters.find((semester: any) =>
    semester.id === selectedSemesterId || semester.name === selectedSemesterId
  );
  const semesterCode = formatSemesterCode(selectedSemester?.name || selectedSemesterId);
  const pageTitle = [semesterCode, "Thursdays"].filter(Boolean).join(", ");

  return (
    <>
      <Split
        start={<h2>{pageTitle}</h2>}
        end={
          <>
            <FilterInput query={"thursdays"} />
            <FilterSelect
              filter={"semesterId"}
              options={semesters}
              defaultValue={selectedSemesterId}
            />
            {isAdmin && <Button href="/thursdays/add">Add</Button>}
          </>
        }
      />
      <div className={styles.resultsWrapper}>
        <ResultsContainer>
          <Suspense
            fallback={<div style={{ opacity: 0.5 }}>Loading days...</div>}
          >
            <ThursdaysList filters={filters} isAdmin={isAdmin} semesters={semesters} />
          </Suspense>
        </ResultsContainer>
      </div>
    </>
  );
}
