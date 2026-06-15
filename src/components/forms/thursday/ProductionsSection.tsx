"use client";

import { useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { Empty } from "antd";
import { Button, Collapse } from "@/components/ui/AntD";
import ProductionForm from "@/components/forms/thursday/ProductionForm";
import { BasicUser } from "@/components/forms/schemas";
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import ModalPopup from "@/components/ui/ModalPopup";
import confirmDeleteStyles from "@/components/ui/ConfirmDelete/ConfirmDelete.module.css";
import formStyles from "@/components/forms/thursday/ThursdayForm.module.css";

interface ProductionsSectionProps {
  control: any;
  users: BasicUser[];
}

export default function ProductionsSection({
  control,
  users,
}: ProductionsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "productions",
  });

  const watchProductions = useWatch({ control, name: "productions" });
  const thursdayDate = useWatch({ control, name: "date" });

  const formattedDate = thursdayDate
    ? new Date(thursdayDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  const [pendingRemoveIndex, setPendingRemoveIndex] = useState<number | null>(null);

  return (
    <div>
      <div className={formStyles.sectionHeader}>
        <span className={`${formStyles.sectionLabel} ui-label`}>Productions</span>
        <Button
          htmlType="button"
          className="action-button"
          onClick={() =>
            append({
              name: "",
              location: "Pozen Center",
              producers: [],
              presentations: [],
            })
          }
        >
          Add Production
        </Button>
      </div>

      {fields.length === 0 ? (
        <Empty
          className={formStyles.emptyState}
          description="No productions yet."
        />
      ) : (
        <Collapse
          className={formStyles.collapse}
          defaultActiveKey={fields.map((f: any) => f.id)}
          expandIcon={({ isActive }) => (
            <span
              className={`${formStyles.expandIcon} ${isActive ? formStyles.expandIconOpen : formStyles.expandIconClosed}`}
              aria-hidden="true"
            />
          )}
          items={fields.map((field: any, pIndex) => {
            const name = watchProductions?.[pIndex]?.name;
            const displayName = name || `Unnamed Production ${pIndex + 1}`;
            const label = (
              <span className={formStyles.collapseLabel}>
                <span className={formStyles.collapseTitle}>{displayName}</span>
                {formattedDate && <span className={formStyles.collapseMeta}>{formattedDate}</span>}
              </span>
            );

            return {
              key: field.id,
              style: { background: "var(--app-surface)", borderColor: "var(--app-border)" },
              styles: {
                header: { background: "var(--app-surface)", color: "var(--app-text)" },
                body: { background: "var(--app-surface)", color: "var(--app-text)" },
              },
              label,
              extra: (
                <button
                  type="button"
                  className={formStyles.iconButton}
                  aria-label="Remove production"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPendingRemoveIndex(pIndex);
                  }}
                >
                  <span className={`${formStyles.icon} ${formStyles.deleteIcon}`} aria-hidden="true" />
                </button>
              ),
              children: (
                <ProductionForm
                  productionIndex={pIndex}
                  control={control}
                  users={users}
                />
              ),
            };
          })}
        />
      )}

      <ModalPopup
        open={pendingRemoveIndex !== null}
        onOpenChange={(open) => {
          if (!open) setPendingRemoveIndex(null);
        }}
        title="Remove Production"
        dialogClassName={confirmDeleteStyles.dialog}
      >
        <ConfirmDelete
          itemName="this production"
          itemType="production"
          confirmLabel="Remove Production"
          pendingLabel="Removing..."
          errorMessage="Could not remove the production."
          onConfirm={() => {
            if (pendingRemoveIndex !== null) remove(pendingRemoveIndex);
          }}
          onConfirmed={() => setPendingRemoveIndex(null)}
        />
      </ModalPopup>
    </div>
  );
}
