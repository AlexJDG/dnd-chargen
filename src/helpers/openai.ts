import OpenAI from "openai";
import { AVATAR, BACKSTORY } from "@/config/prompts";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { TAlignment } from "@/components/alignment-picker";

const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export type TCharacterInfo = {
    class?: string;
    background?: string;
    race?: string;
    alignment?: TAlignment;
};

const backstoryResponseSchema = z.object({
    name: z.string(),
    age: z.number(),
    physicalAppearance: z.string(),
    personalityTraits: z.array(z.string()),
    backstoryParagraphs: z.array(z.string()),
});

export const generateBackstory = async (characterInfo: TCharacterInfo) => {
    console.debug("Generating backstory with character info:", characterInfo);

    const completion = await openai.beta.chat.completions.parse({
        messages: [
            {
                role: "system",
                content: BACKSTORY,
            },
            {
                role: "user",
                content: Object.entries(characterInfo)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join("\n"),
            },
        ],
        response_format: zodResponseFormat(backstoryResponseSchema, "data"),
        model: "gpt-4o-2024-08-06",
    });

    console.debug("OpenAPI response: ", completion);

    return completion.choices[0].message.parsed;
};

export const generateImage = async (
    params: TCharacterInfo & TGeneratedCharacterInfo,
) => {
    console.debug("Generating image with params:", params);
    const completion = await openai.images.generate({
        size: "1024x1792",
        n: 1,
        model: "dall-e-3",
        prompt: AVATAR + JSON.stringify(params),
    });

    console.debug("OpenAPI image response: ", completion);
    return completion.data[0].url;
};

export type TGeneratedCharacterInfo = Awaited<
    ReturnType<typeof generateBackstory>
>;
