import { ModeToggle } from "@/components/mode-toggle";
import {
    generateBackstory,
    generateImage,
    TCharacterInfo,
    TGeneratedCharacterInfo,
} from "@/helpers/openai";
import { useState } from "react";
import { BasicParameterPicker } from "@/components/basic-parameter-picker";
import { AlignmentPicker } from "@/components/alignment-picker";
import { Backstory } from "@/components/backstory";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { LoaderCircle, LoaderCircleIcon } from "lucide-react";

function App() {
    const [characterParameters, setCharacterParameters] =
        useState<TCharacterInfo>();

    const [loading, setLoading] = useState(false);
    const [generatedInfo, setGeneratedInfo] =
        useState<TGeneratedCharacterInfo>();
    const [imageURL, setImageURL] = useState<string>();

    const generateCharacter = async () => {
        if (!characterParameters) return;
        setLoading(true);
        const generatedInfo = await generateBackstory(characterParameters);
        setGeneratedInfo(generatedInfo);

        if (generatedInfo) {
            const imageURL = await generateImage({
                ...characterParameters,
                ...generatedInfo,
            });
            setImageURL(imageURL);
        }

        setLoading(false);
    };

    return (
        <main className="container p-5 max-w-[1200px] flex flex-col gap-5">
            <header className="flex gap-5">
                <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl">
                    D&D Backstory Generator
                </h1>
                <ModeToggle />
            </header>
            <section className="flex flex-wrap gap-5">
                <BasicParameterPicker
                    className="flex-1"
                    characterParameters={characterParameters}
                    setCharacterParameters={setCharacterParameters}
                />
                <AlignmentPicker
                    className="flex-0"
                    value={characterParameters?.alignment}
                    onValueChange={(alignment) =>
                        setCharacterParameters((curr) => ({
                            ...curr,
                            alignment,
                        }))
                    }
                />
                <Backstory
                    className="min-w-80 max-w-full lg:flex-1"
                    backstory={generatedInfo}
                />
                <Avatar
                    className="self-start max-w-[420px]"
                    imageUrl={imageURL}
                />
            </section>
            <Button
                disabled={loading}
                onClick={generateCharacter}
                className="flex gap-2"
            >
                {loading ? "Generating..." : "Generate Character"}
                {loading && <LoaderCircle className="animate-spin" />}
            </Button>
        </main>
    );
}

export default App;
