import type React from "react";
interface FormFieldsGroupProps {
  children: React.ReactNode;
}

export function FormFieldsGroup({ children }: FormFieldsGroupProps) {
  return <div className="space-y-4">{children}</div>;
}
