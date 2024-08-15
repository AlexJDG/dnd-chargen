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

type TOption<T extends string> = T | { label: string; value: T };

const renderOptions = <T extends string>(options: TOption<T>[]) =>
    options.map((option) => (
        <SelectItem
            key={typeof option === "string" ? option : option.value}
            value={typeof option === "string" ? option : option.value}
        >
            {typeof option === "string" ? option : option.label}
        </SelectItem>
    ));

export const LabelledSelect = <T extends string>({
    value,
    onValueChange,
    label,
    options,
    id,
    placeholder,
}: {
    value: T | undefined;
    onValueChange: (value: T) => void;
    label: string;
    placeholder: string;
    id: string;
    options: readonly TOption<T>[] | Record<string, readonly TOption<T>[]>;
}) => (
    <div className="flex flex-col min-w-80 gap-2">
        <Label htmlFor={id}>{label}</Label>
        <Select
            value={value}
            onValueChange={(newVal) => onValueChange(newVal as T)}
        >
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
