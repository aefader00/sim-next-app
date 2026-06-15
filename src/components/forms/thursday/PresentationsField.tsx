"use client";

import { useState } from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { Space } from "antd";
import {
  Input,
  Select,
  Collapse,
  Button,
} from "@/components/ui/AntD";
import { BasicUser } from "@/components/forms/schemas";
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import ModalPopup from "@/components/ui/ModalPopup";
import confirmDeleteStyles from "@/components/ui/ConfirmDelete/ConfirmDelete.module.css";
import formStyles from "@/components/forms/thursday/ThursdayForm.module.css";

interface PresentationsFieldProps {
  productionIndex: number;
  control: any;
  users: BasicUser[];
}

export default function PresentationsField({
  productionIndex,
  control,
  users,
}: PresentationsFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `productions.${productionIndex}.presentations`,
  });

  const watchPresentations = useWatch({
    control,
    name: `productions.${productionIndex}.presentations`,
  });

  const [pendingRemoveIndex, setPendingRemoveIndex] = useState<number | null>(null);
  const studentUsers = users.filter((u) => (u as any).role === "STUDENT");

  return (
    <div>
      <div className={formStyles.sectionHeader}>
        <span className={`${formStyles.sectionLabel} ui-label`}>Presentations</span>
        <Button
          htmlType="button"
          className="action-button"
          onClick={() =>
            append({
              name: "",
              presenters: [],
            })
          }
        >
          Add Presentation
        </Button>
      </div>

      {fields.length === 0 ? (
        <p className={formStyles.emptyText}>No presentations yet.</p>
      ) : (
        <Collapse
          className={formStyles.collapse}
          expandIcon={({ isActive }) => (
            <span
              className={`${formStyles.expandIcon} ${isActive ? formStyles.expandIconOpen : formStyles.expandIconClosed}`}
              aria-hidden="true"
            />
          )}
          items={fields.map((field: any, pIndex) => {
            const name = watchPresentations?.[pIndex]?.name;
            const label = (
              <span className={formStyles.collapseLabel}>
                <span className={formStyles.collapseTitle}>
                  {name ? `Presentation ${pIndex + 1}: ${name}` : `Unnamed Presentation ${pIndex + 1}`}
                </span>
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
                  aria-label="Remove presentation"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPendingRemoveIndex(pIndex);
                  }}
                >
                  <span className={`${formStyles.icon} ${formStyles.deleteIcon}`} aria-hidden="true" />
                </button>
              ),
              children: (
                <Space orientation="vertical" style={{ width: "100%" }} size="middle">
                  <div className={formStyles.fieldStack}>
                    <span className={`${formStyles.fieldLabel} ui-label`}>Presentation Name</span>
                    <Controller
                      control={control}
                      name={`productions.${productionIndex}.presentations.${pIndex}.name`}
                      rules={{ required: "Presentation name is required" }}
                      render={({ field, fieldState }) => (
                        <>
                          <Input
                            {...field}
                            placeholder="Enter presentation name"
                            status={fieldState.error ? "error" : ""}
                          />
                          {fieldState.error && (
                            <span className="ui-note">{fieldState.error.message}</span>
                          )}
                        </>
                      )}
                    />
                  </div>

                  <div>
                    <Controller
                      control={control}
                      name={`productions.${productionIndex}.presentations.${pIndex}.presenters`}
                      render={({ field }) => (
                        <>
                          <div className={formStyles.sectionHeader}>
                            <span className={`${formStyles.sectionLabel} ui-label`}>Presenters</span>
                            <div className={formStyles.inlineActions}>
                              <button
                                type="button"
                                onClick={() => field.onChange(studentUsers.map((u) => u.id))}
                                className={formStyles.textButton}
                              >
                                Select all
                              </button>
                              <button
                                type="button"
                                onClick={() => field.onChange([])}
                                className={`${formStyles.textButton} ${formStyles.textButtonDanger}`}
                              >
                                Unselect all
                              </button>
                            </div>
                          </div>
                          <Select
                            {...field}
                            mode="multiple"
                            showSearch
                            maxTagCount={12}
                            maxTagPlaceholder={(omitted) => `+${omitted.length} more users`}
                            placeholder="Search and select presenters..."
                            style={{ width: "100%" }}
                            filterOption={(input, option) =>
                              (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                              ...studentUsers,
                              ...users.filter(
                                (u) => (field.value ?? []).includes(u.id) && (u as any).role !== "STUDENT"
                              ),
                            ]
                              .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""))
                              .map((u) => ({ value: u.id, label: u.name ?? "Unnamed User" }))}
                            optionRender={(option) => {
                              const isSelected = (field.value ?? []).includes(option.value as string);
                              return (
                                <div className={formStyles.optionRow}>
                                  <span className={`${formStyles.optionBadge} ${isSelected ? formStyles.optionBadgeSelected : ""}`}>
                                    {isSelected ? "Selected" : "Unselected"}
                                  </span>
                                  <span className={formStyles.optionName}>{option.label}</span>
                                </div>
                              );
                            }}
                          />
                        </>
                      )}
                    />
                  </div>
                </Space>
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
        title="Remove Presentation"
        dialogClassName={confirmDeleteStyles.dialog}
      >
        <ConfirmDelete
          itemName="this presentation"
          itemType="presentation"
          confirmLabel="Remove Presentation"
          pendingLabel="Removing..."
          errorMessage="Could not remove the presentation."
          onConfirm={() => {
            if (pendingRemoveIndex !== null) remove(pendingRemoveIndex);
          }}
          onConfirmed={() => setPendingRemoveIndex(null)}
        />
      </ModalPopup>
    </div>
  );
}
