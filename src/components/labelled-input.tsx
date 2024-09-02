import { Label } from "@/components/ui/label";
import { Input, InputProps } from "@/components/ui/input";
import { forwardRef, HTMLInputTypeAttribute } from "react";

export const LabelledInput = forwardRef<
    HTMLInputElement,
    {
        value: string | undefined;
        onValueChange: (value: string) => void;
        label: string;
        id: string;
        placeholder: string;
        type?: HTMLInputTypeAttribute;
        className?: string;
    } & InputProps
>(
    (
        {
            value,
            onValueChange,
            label,
            id,
            placeholder,
            type,
            className,
            ...inputProps
        },
        ref,
    ) => (
        <div className={className}>
            <Label className="whitespace-nowrap" htmlFor={id}>
                {label}
                {inputProps?.required && " *"}
            </Label>
            <Input
                className="invalid:border-red-500 invalid:border-2"
                value={value}
                onChange={(newVal) => onValueChange(newVal.target.value)}
                type={type ?? "text"}
                id={id}
                placeholder={placeholder}
                ref={ref}
                {...inputProps}
            />
        </div>
    ),
);
