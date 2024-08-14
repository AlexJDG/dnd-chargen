import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FC } from "react";

type TOption = string | { label: string; value: string };

const renderOptions = (options: TOption[]) =>
    options.map((option) => (
        <SelectItem
            key={typeof option === "string" ? option : option.value}
            value={typeof option === "string" ? option : option.value}
        >
            {typeof option === "string" ? option : option.label}
        </SelectItem>
    ));

export const LabelledSelect: FC<{
    value: string | undefined;
    onValueChange: (value: string) => void;
    label: string;
    placeholder: string;
    id: string;
    options: readonly TOption[] | Record<string, readonly TOption[]>;
}> = ({ value, onValueChange, label, options, id, placeholder }) => (
    <div className="flex flex-col min-w-80 gap-2">
        <Label htmlFor={id}>{label}</Label>
        <Select value={value} onValueChange={(newVal) => onValueChange(newVal)}>
            <SelectTrigger id={id}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {Array.isArray(options)
                    ? renderOptions(options)
                    : Object.entries(options).map(([category, subOptions]) => (
                          <SelectGroup key={category}>
                              <SelectLabel>{category}</SelectLabel>
                              {renderOptions(subOptions)}
                          </SelectGroup>
                      ))}
            </SelectContent>
        </Select>
    </div>
);
