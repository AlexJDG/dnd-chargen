import { FC } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TGeneratedCharacterInfo } from "@/helpers/openai";

export const Backstory: FC<{
    backstory?: TGeneratedCharacterInfo;
    className?: string;
}> = ({ backstory, className }) => {
    return (
        backstory && (
            <Card className={className}>
                <CardHeader>
                    <CardTitle>{backstory.name}</CardTitle>
                    <CardDescription>Age: {backstory.age}, </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <p>{backstory.physicalAppearance}</p>
                    {backstory.backstoryParagraphs.map((paragraph, idx) => (
                        <p key={`${idx}-${paragraph}`}>{paragraph}</p>
                    ))}
                </CardContent>
            </Card>
        )
    );
};
