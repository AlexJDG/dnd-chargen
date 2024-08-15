import { TCharacterAttributes } from "@/helpers/openai";
import { Dispatch, FC, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LabelledSelect } from "@/components/labelled-select";
import { RACES } from "@/config/races";
import { CLASSES } from "@/config/classes";
import { BACKGROUNDS } from "@/config/backgrounds";
import { GENDERS } from "@/config/genders";

export const BasicParameterPicker: FC<{
    characterParameters: Partial<TCharacterAttributes>;
    setCharacterParameters: Dispatch<
        SetStateAction<Partial<TCharacterAttributes>>
    >;
    className?: string;
}> = ({ characterParameters, setCharacterParameters, className }) => (
    <Card className={className}>
        <CardHeader>
            <CardTitle>Character Information</CardTitle>
        </CardHeader>
        <CardContent className="min-w-60">
            <section className="flex flex-col gap-5">
                <LabelledSelect
                    value={characterParameters?.race}
                    onValueChange={(race) =>
                        setCharacterParameters((curr) => ({ ...curr, race }))
                    }
                    label="Race"
                    placeholder="Select a Race"
                    id="select-race"
                    options={RACES}
                />
                <LabelledSelect
                    value={characterParameters?.class}
                    onValueChange={(newClass) =>
                        setCharacterParameters((curr) => ({
                            ...curr,
                            class: newClass,
                        }))
                    }
                    label="Class"
                    placeholder="Select a Class"
                    id="select-class"
                    options={CLASSES}
                />
                <LabelledSelect
                    value={characterParameters?.background}
                    onValueChange={(background) =>
                        setCharacterParameters((curr) => ({
                            ...curr,
                            background,
                        }))
                    }
                    label="Background"
                    placeholder="Select a Background"
                    id="select-background"
                    options={BACKGROUNDS}
                />
                <LabelledSelect
                    value={characterParameters?.gender}
                    onValueChange={(gender) =>
                        setCharacterParameters((curr) => ({
                            ...curr,
                            gender,
                        }))
                    }
                    label="Gender"
                    placeholder="Select a Gender"
                    id="select-gender"
                    options={GENDERS}
                />
            </section>
        </CardContent>
    </Card>
);
