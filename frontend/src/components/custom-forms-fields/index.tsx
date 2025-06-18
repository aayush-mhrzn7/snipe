import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import {
  InputControllerProps,
  SelectControllerProps,
} from "@/utils/interface/controller.interface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CustomLabel = ({ name }: { name: string }) => {
  return (
    <label
      htmlFor={name}
      className="block text-sm my-2 font-medium leading-6 text-gray-900"
    >
      {name}
    </label>
  );
};
const CustomInput = ({
  name,
  control,
  inputType,
  label,
  error,
}: InputControllerProps) => {
  return (
    <>
      <CustomLabel name={label} />
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Input type={inputType} {...field} />}
      />
      <CustomLabel name={error} />
    </>
  );
};
const CustomSelect = ({
  options,
  name,
  control,
  label,
  error,
  placeholder,
}: SelectControllerProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...rest } }) => (
        <>
          {" "}
          <CustomLabel name={label} />
          <Select onValueChange={onChange} value={value} {...rest}>
            <SelectTrigger className="w-full min-w-[150px]">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((item: { label: string; value: string }) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <CustomLabel name={error} />
        </>
      )}
    />
  );
};
export { CustomInput, CustomSelect, CustomLabel };
