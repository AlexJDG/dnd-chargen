import { FC } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ALIGNMENTS } from "@/config/alignments";

type TAlignment = (typeof ALIGNMENTS)[number];

export const AlignmentPicker: FC<{
    value: TAlignment | undefined;
    onValueChange: (value: TAlignment) => void;
    className?: string;
}> = ({ value, onValueChange, className }) => (
    <Card className={className}>
        <CardHeader>
            <CardTitle>Alignment</CardTitle>
        </CardHeader>
        <CardContent className="flex">
            <ToggleGroup
                type="single"
                value={value}
                onValueChange={onValueChange}
                className="grid grid-flow-row grid-cols-3 gap-5"
            >
                {ALIGNMENTS.map((alignment) => (
                    <ToggleGroupItem
                        key={alignment}
                        value={alignment}
                        variant="outline"
                        className="size-24"
                    >
                        {alignment}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </CardContent>
    </Card>
);
