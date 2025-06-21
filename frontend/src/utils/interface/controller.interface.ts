import { Control } from "react-hook-form";

interface ControllerProps {
  name: string;
  control: Control;
  label: string;
  error: string;
  className?: string;
}

export interface InputControllerProps extends ControllerProps {
  inputType: string;
  disabled?: boolean;
  placeholder: string;
}
export interface SelectControllerProps extends ControllerProps {
  options: {
    label: string;
    value: string;
  }[];
  placeholder: string;
}
