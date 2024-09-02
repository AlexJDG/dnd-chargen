import { ModeToggle } from "@/components/mode-toggle";
import {
    generateAttributes,
    generateBackstory,
    generateImage,
    TCharacterAttributes,
    TCharacterBackstory,
} from "@/helpers/openai";
import { useEffect, useRef, useState } from "react";
import { BasicParameterPicker } from "@/components/basic-parameter-picker";
import { AlignmentPicker } from "@/components/alignment-picker";
import { Backstory } from "@/components/backstory";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { LabelledInput } from "@/components/labelled-input";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import OpenAI from "openai";

export const App = () => {
    const [characterParameters, setCharacterParameters] = useState<
        Partial<TCharacterAttributes>
    >({});

    const [loading, setLoading] = useState(false);
    const [backstoryInfo, setBackstoryInfo] = useState<TCharacterBackstory>();
    const [imageURL, setImageURL] = useState<string>();
    const [apiKey, setApiKey] = useLocalStorage<string>("openai-api-key");
    const openAiAPI = useRef<OpenAI>();
    const apiKeyInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (apiKey) {
            openAiAPI.current = new OpenAI({
                dangerouslyAllowBrowser: true,
                apiKey,
            });
        }
    }, [apiKey]);

    const generateCharacter = async () => {
        if (!openAiAPI.current) {
            apiKeyInputRef.current?.focus();
            console.log(apiKeyInputRef.current);
            alert("OpenAI API key not set");
            return;
        }

        setLoading(true);

        const attributes = await generateAttributes(
            characterParameters,
            openAiAPI.current,
        );
        setCharacterParameters(attributes);

        const generatedInfo = await generateBackstory(
            attributes,
            openAiAPI.current,
        );
        setBackstoryInfo(generatedInfo);

        if (generatedInfo) {
            const imageURL = await generateImage(
                {
                    ...attributes,
                    ...generatedInfo,
                },
                openAiAPI.current,
            );
            setImageURL(imageURL);
        }

        setLoading(false);
    };

    return (
        <main className="container p-5 max-w-[1200px] flex flex-col gap-5">
            <header className="flex gap-5 justify-between">
                <div className="flex gap-5">
                    <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl">
                        D&D Backstory Generator
                    </h1>
                    <ModeToggle />
                </div>
                <LabelledInput
                    className="flex flex-row items-center gap-5 w-[300px]"
                    value={apiKey}
                    onValueChange={setApiKey}
                    label={"OpenAI API key"}
                    type="password"
                    id={"openai-api-key-input"}
                    placeholder={"OpenAI API key"}
                    required
                    ref={apiKeyInputRef}
                />
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
                    className="min-w-80 max-w-full lg:min-w-[600px] lg:flex-1"
                    backstory={backstoryInfo}
                    characterAttributes={characterParameters}
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
};

export default App;
