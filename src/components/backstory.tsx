import { FC } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TCharacterAttributes, TCharacterBackstory } from "@/helpers/openai";

export const Backstory: FC<{
    backstory?: TCharacterBackstory;
    characterAttributes: Partial<TCharacterAttributes>;
    className?: string;
}> = ({ backstory, characterAttributes, className }) => {
    return (
        backstory && (
            <Card className={className}>
                <CardHeader>
                    <CardTitle>{characterAttributes.name}</CardTitle>
                    <CardDescription>
                        Age: {characterAttributes?.age},{" "}
                    </CardDescription>
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
