import OpenAI from "openai";
import { ATTRIBUTES, AVATAR, BACKSTORY } from "@/config/prompts";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { CLASSES } from "@/config/classes";
import { BACKGROUNDS } from "@/config/backgrounds";
import { RACES } from "@/config/races";
import { GENDERS } from "@/config/genders";
import { ALIGNMENTS } from "@/config/alignments";

const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const attributeResponseSchema = z.object({
    class: z.enum(CLASSES),
    background: z.enum(BACKGROUNDS),
    race: z.enum(RACES),
    gender: z.enum(GENDERS),
    alignment: z.enum(ALIGNMENTS),
    name: z.string(),
    age: z.number(),
});

const backstoryResponseSchema = z.object({
    physicalAppearance: z.string(),
    personalityTraits: z.array(z.string()),
    backstoryParagraphs: z.array(z.string()),
});

export type TCharacterAttributes = z.infer<typeof attributeResponseSchema>;

export const generateAttributes = async (
    characterInfo: Partial<TCharacterAttributes>,
): Promise<TCharacterAttributes> => {
    console.debug("Generating character attributes");

    const attributes = Object.entries(characterInfo).map(
        ([key, value]) => `${key}: ${value}`,
    );

    const completion = await openai.beta.chat.completions.parse({
        messages: [
            {
                role: "system",
                content: ATTRIBUTES,
            },
            {
                role: "user",
                content: attributes.length
                    ? attributes.join("\n")
                    : "No attributes provided",
            },
        ],
        response_format: zodResponseFormat(
            attributeResponseSchema.omit(
                Object.fromEntries(
                    Object.entries(characterInfo)
                        .filter(([, value]) => !!value)
                        .map(([key]) => [key, true] as const),
                ) as Record<keyof TCharacterAttributes, true>,
            ),
            "character_data",
        ),
        model: "gpt-4o-2024-08-06",
    });

    console.debug("OpenAPI response: ", completion);

    return {
        ...characterInfo,
        ...completion.choices[0].message.parsed,
    } as TCharacterAttributes;
};

export const generateBackstory = async (
    characterInfo: TCharacterAttributes,
) => {
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
        response_format: zodResponseFormat(
            backstoryResponseSchema,
            "backstory_data",
        ),
        model: "gpt-4o-2024-08-06",
    });

    console.debug("OpenAPI response: ", completion);

    return completion.choices[0].message.parsed;
};

export const generateImage = async (
    params: TCharacterAttributes & TCharacterBackstory,
) => {
    console.debug("Generating image with params:", params);
    const completion = await openai.images.generate({
        size: "1024x1792",
        n: 1,
        model: "dall-e-3",
        prompt: AVATAR + JSON.stringify(params),
        quality: "hd",
    });

    console.debug("OpenAPI image response: ", completion);
    return completion.data[0].url;
};

export type TCharacterBackstory = Awaited<ReturnType<typeof generateBackstory>>;
