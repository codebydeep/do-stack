import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "../utils/prompt.js";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function askAIService(context, query){
    const res = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",



        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "assistant", content: context },
            { role: "user", content: query },
        ],
        temperature: 0.2,
    })

    return res.choices[0];
}