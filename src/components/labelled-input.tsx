import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const LabelledInput = <T extends string>({
    value,
    onValueChange,
    label,
    id,
    placeholder,
    className,
}: {
    value: T | undefined;
    onValueChange: (value: T) => void;
    label: string;
    id: string;
    placeholder: string;
    className?: string;
}) => (
    <div className={className}>
        <Label htmlFor={id}>{label}</Label>
        <Input
            value={value}
            onChange={(newVal) => onValueChange(newVal.target.value as T)}
            type="text"
            id={id}
            placeholder={placeholder}
        />
    </div>
);
