import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Avatar: FC<{
    imageUrl?: string;
    className?: string;
}> = ({ imageUrl, className }) => {
    return (
        imageUrl && (
            <Card className={className}>
                <CardHeader>
                    <CardTitle>Avatar</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <img alt="Generated character avatar" src={imageUrl} />
                </CardContent>
            </Card>
        )
    );
};
