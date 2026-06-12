"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Typography } from "antd";
import { Collapse } from "@/components/ui/AntD";
import styles from "@/components/domain/thursdays/ThursdayCard.module.css";

const { Title } = Typography;

interface ProductionItem {
  id: string;
  name: string;
  href?: string;
  location?: string;
  date?: string;
  extra?: ReactNode;
  content: ReactNode;
}

interface ProductionsCollapseProps {
  productions: ProductionItem[];
}

export default function ProductionsCollapse({ productions }: ProductionsCollapseProps) {
  return (
    <Collapse
      defaultActiveKey={productions.map((p) => p.id)}
      items={productions.map((p) => ({
        key: p.id,
        label: (
          <span className={styles.CollapseLabel}>
            {p.date && <span className={styles.DateBadge}>{p.date}</span>}
            <Title level={4} style={{ margin: 0, lineHeight: 1.1 }}>
              {p.href ? (
                <Link
                  className="buttonless-link"
                  href={p.href}
                  onClick={(event) => event.stopPropagation()}
                >
                  <span className="buttonless-link-text">{p.name}</span>
                  <svg
                    className="buttonless-link-icon"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    focusable="false"
                  >
                    <path
                      d="M9.25 3.25 14 8l-4.75 4.75M13.25 8H2"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                  </svg>
                </Link>
              ) : (
                p.name
              )}
            </Title>
            {p.location && (
              <>
                <span style={{ color: "#bbb", fontWeight: 400, fontSize: "1.05rem" }}>|</span>
                <span style={{ fontWeight: 700, fontSize: "1.05rem" }}>{p.location}</span>
              </>
            )}
          </span>
        ),
        extra: p.extra ? (
          <span onClick={(event) => event.stopPropagation()}>{p.extra}</span>
        ) : undefined,
        children: p.content,
      }))}
    />
  );
}
