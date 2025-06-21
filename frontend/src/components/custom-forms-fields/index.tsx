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
import AsyncSelect from "react-select/async";
import { axiosInstance } from "@/services/api.service";

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
const CustomError = ({ message }: { message: string }) => {
  return (
    <p className="block text-sm my-2 font-medium leading-6 text-danger">
      {message}
    </p>
  );
};
const CustomInput = ({
  name,
  control,
  inputType,
  label,
  placeholder,
  error,
  disabled,
  className,
}: InputControllerProps) => {
  return (
    <>
      <CustomLabel name={label} />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            placeholder={placeholder}
            type={inputType}
            className={className}
            disabled={disabled}
            {...field}
          />
        )}
      />
      <CustomError message={error} />
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
          <CustomError message={error} />
        </>
      )}
    />
  );
};

const CustomOption = ({ innerProps, isDisabled, children }) =>
  !isDisabled ? (
    <div {...innerProps} className="p-2 cursor-pointer bg-primary-accent">
      {children}
    </div>
  ) : null;

const CustomAsyncSelect = ({
  options,
  name,
  control,
  label,
  error,
  placeholder,
}: SelectControllerProps) => {
  const loadOptions = async () => {
    const response = await axiosInstance.get("/category");
    return response.data.result.map((item) => ({
      label: item.name,
      value: item._id,
    }));
  };
  return (
    <>
      <CustomLabel name={label} />
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <AsyncSelect
            isMulti
            {...field}
            placeholder={placeholder}
            cacheOptions
            components={{ Option: CustomOption }}
            loadOptions={loadOptions}
            defaultOptions
            styles={{
              multiValue: (styles) => ({
                ...styles,
                backgroundColor: "#1d9acc",
                color: "#fff",
                textColor: "#fff",
              }),
              multiValueLabel: (styles) => ({
                ...styles,
                color: "#fff",
              }),
            }}
          />
        )}
      />
      <CustomError message={error} />
    </>
  );
};
export {
  CustomInput,
  CustomSelect,
  CustomLabel,
  CustomAsyncSelect,
  CustomError,
};
