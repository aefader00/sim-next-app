"use client";

import { Controller } from "react-hook-form";
import { Space } from "antd";
import {
  Input,
  Select,
} from "@/components/ui/AntD";
import PresentationsField from "@/components/forms/thursday/PresentationsField";
import { BasicUser } from "@/components/forms/schemas";
import styles from "@/components/forms/thursday/ProductionForm.module.css";
import formStyles from "@/components/forms/thursday/ThursdayForm.module.css";

const LOCATIONS = [
  { label: "Pozen Center", value: "Pozen Center" },
  { label: "Studio A", value: "Studio A" },
  { label: "Studio B", value: "Studio B" },
  { label: "Main Hall", value: "Main Hall" },
];

interface ProductionFormProps {
  productionIndex: number;
  control: any;
  users: BasicUser[];
}

export default function ProductionForm({
  productionIndex,
  control,
  users,
}: ProductionFormProps) {
  const producerUsers = users.filter((u) => (u as any).role !== "STAFF");

  return (
    <Space orientation="vertical" style={{ width: "100%" }} size="large">
      <div className={styles.formGrid}>
        <div className={formStyles.fieldStack}>
          <span className={`${formStyles.fieldLabel} ui-label`}>Production Name</span>
          <Controller
            control={control}
            name={`productions.${productionIndex}.name`}
            rules={{ required: "Production name is required" }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  placeholder="Enter production name"
                  status={fieldState.error ? "error" : ""}
                />
                {fieldState.error && (
                  <span className="ui-note">{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </div>

        <div className={formStyles.fieldStack}>
          <span className={`${formStyles.fieldLabel} ui-label`}>Location</span>
          <Controller
            control={control}
            name={`productions.${productionIndex}.location`}
            rules={{ required: "Location is required" }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  {...field}
                  placeholder="Select location"
                  options={LOCATIONS}
                  allowClear
                  style={{ width: "100%" }}
                  status={fieldState.error ? "error" : ""}
                />
                {fieldState.error && (
                  <span className="ui-note">{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </div>
      </div>

      <div>
        <Controller
          control={control}
          name={`productions.${productionIndex}.producers`}
          render={({ field }) => (
            <>
              <div className={formStyles.sectionHeader}>
                <span className={`${formStyles.sectionLabel} ui-label`}>Producers & Faculty</span>
                <div className={formStyles.inlineActions}>
                  <button
                    type="button"
                    onClick={() => field.onChange(producerUsers.map((u) => u.id))}
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
                placeholder="Search and select users..."
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  ...producerUsers,
                  ...users.filter(
                    (u) => (field.value ?? []).includes(u.id) && (u as any).role === "STAFF"
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

      <PresentationsField
        productionIndex={productionIndex}
        control={control}
        users={users}
      />
    </Space>
  );
}
