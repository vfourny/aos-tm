import { ErrorMessage } from "../../../../.nuxt/components"
export enum FORM_FIELD_TYPE {
  CHECKBOX = "checkbox",
  NUMBER = "number",
  SELECT = "select",
  TEXT = "text",
  TEXTAREA = "textarea",
  TOGGLE = "toggle"
}

export interface FormFieldModel {
  errorMessage?:string
  hasDependencies?: boolean,
  isDisabled?: boolean;
  isDisplayErrorMessage?: boolean;
  label?: string;
  name: string;
  placeholder?: string;
  selectOptions?: {
    hasMultiple?: boolean;
    items: {
      filters?: {
        dependentFieldKey: string,
        requiredValue: string | boolean | number
      }[],
      key: string;
      value: string | boolean | number;
    }[];
  };
  type: FORM_FIELD_TYPE;
}
