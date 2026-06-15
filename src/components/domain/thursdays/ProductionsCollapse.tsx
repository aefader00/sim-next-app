"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Collapse } from "@/components/ui/AntD";
import { useActionMode } from "@/components/ui/ActionMode";
import styles from "@/components/domain/thursdays/ThursdayCard.module.css";

interface ProductionItem {
  id: string;
  name: string;
  href?: string;
  location?: string;
  date?: string;
  content: ReactNode;
}

interface ProductionsCollapseProps {
  productions: ProductionItem[];
}

function ExpandIcon({ isActive }: { isActive?: boolean }) {
  return (
    <span className={`${styles.ExpandIcon}${isActive ? ` ${styles.ExpandIconActive}` : ""}`}>
      <svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function ProductionsCollapse({ productions }: ProductionsCollapseProps) {
  const { activeMode } = useActionMode();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function openThursdayModal(thursdayId: string, modalParam: "editThursdayId" | "deleteThursdayId") {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("addThursday");
    params.delete("thursdayId");
    params.delete("editThursdayId");
    params.delete("deleteThursdayId");
    params.set(modalParam, thursdayId);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleActionModeClick(thursdayId: string) {
    if (activeMode === "edit-thursdays") {
      openThursdayModal(thursdayId, "editThursdayId");
      return true;
    }

    if (activeMode === "delete-thursdays") {
      openThursdayModal(thursdayId, "deleteThursdayId");
      return true;
    }

    return false;
  }

  return (
    <div
      className={styles.ThursdayActionTarget}
      data-action-mode-target="thursday-card"
      data-thursday-id={productions[0]?.id}
      onClickCapture={(event) => {
        const thursdayId = productions[0]?.id;
        if (!thursdayId || !handleActionModeClick(thursdayId)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <Collapse
        className={styles.ProductionsCollapseRoot}
        defaultActiveKey={[]}
        expandIcon={ExpandIcon}
        style={{ background: "var(--app-card-bg)", borderColor: "var(--app-border)", color: "var(--app-text)", overflow: "hidden" }}
        items={productions.map((p) => ({
          key: p.id,
          style: { borderColor: "var(--app-border)" },
          styles: {
            header: { background: "var(--app-card-bg)", color: "var(--app-text)" },
            body: { background: "var(--app-card-bg)", color: "var(--app-text)" },
          },
          label: (
            <span className={styles.CollapseLabel}>
              <h3 className={styles.CollapseTitle}>
                {p.href ? (
                  <Link
                    className={styles.CollapseHeaderLink}
                    href={p.href}
                    onClick={(event) => {
                      if (handleActionModeClick(p.id)) {
                        event.preventDefault();
                      }
                      event.stopPropagation();
                    }}
                  >
                    {p.name}
                  </Link>
                ) : (
                  p.name
                )}
              </h3>
              {p.location && (
                <>
                  <span style={{ color: "var(--app-muted)", fontWeight: 400, fontSize: "1.05rem" }}>|</span>
                  <span style={{ fontWeight: 700, fontSize: "1.05rem" }}>{p.location}</span>
                </>
              )}
            </span>
          ),
          extra: p.date ? (
            <span className={styles.DateBadge}>{p.date}</span>
          ) : undefined,
          children: p.content,
        }))}
      />
      <span className={styles.ThursdayActionOverlay} data-thursday-action-overlay aria-hidden="true">
        <span className={styles.ThursdayActionOverlayIcon} />
      </span>
    </div>
  );
}
