"use client";

import { Controller } from "react-hook-form";
import { Input, DatePicker, Select } from "@/components/ui/AntD";
import dayjs from "dayjs";
import styles from "@/components/forms/thursday/ThursdaySection.module.css";
import formStyles from "@/components/forms/thursday/ThursdayForm.module.css";

interface ThursdaySectionProps {
  control: any;
  semesters?: Array<{ id: string; name: string }>;
}

export default function ThursdaySection({
  control,
  semesters,
}: ThursdaySectionProps) {
  return (
    <div className={formStyles.formStack}>
      <div className={semesters ? styles.formGrid : undefined}>
        {semesters && (
          <div className={formStyles.fieldStack}>
            <span className={`${formStyles.fieldLabel} ui-label`}>Semester</span>
            <Controller
              control={control}
              name="semesterId"
              render={({ field }) => (
                <Select
                  {...field}
                  options={semesters.map((s) => ({ label: s.name, value: s.id }))}
                  style={{ width: "100%" }}
                  size="large"
                />
              )}
            />
          </div>
        )}
        <div className={formStyles.fieldStack}>
          <span className={`${formStyles.fieldLabel} ui-label`}>Day Name</span>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Day name is required" }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  placeholder="Enter Day name"
                  size="large"
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

      <div className={formStyles.fieldStack}>
        <span className={`${formStyles.fieldLabel} ui-label`}>Date</span>
        <Controller
          control={control}
          name="date"
          rules={{ required: "Date is required" }}
          render={({ field, fieldState }) => (
            <>
              <DatePicker
                {...field}
                value={field.value ? dayjs(field.value) : null}
                onChange={(d) =>
                  field.onChange(d && !Array.isArray(d) ? d.toISOString() : null)
                }
                style={{ width: "100%" }}
                size="large"
                format="MMM D, YYYY"
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
  );
}
