
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { LogEntry, Token, GameState, GridSize, Actor } from '../types';
import { getTacticalContext } from '../utils/aiLogic';
import { isActor } from '../utils/gameLogic';
import { DM_SYSTEM_INSTRUCTION, COMBAT_SYSTEM_INSTRUCTION, dmTools, combatStrategySchema, mapAnalysisSchema } from '../utils/aiConfig';

export interface DMResponse {
    text: string;
    toolCalls?: { name: string; args: any }[];
}

export interface CombatStrategy {
    targetName: string;
    actionName: string;
    reasoning: string;
    isSupportAction: boolean;
}

export interface MapAnalysis {
    spawnPoints: { x: number; y: number; type: 'player' | 'enemy' }[];
    terrainFeatures: { x: number; y: number; description: string; type: 'difficult' | 'cover' | 'hazard' | 'none' }[];
}

export interface MapSearchResult {
    text: string;
    links: { title: string; uri: string }[];
}

// Initialize Client
// NOTE: Ensure REACT_APP_API_KEY or VITE_API_KEY is set in environment, or handled via define in vite.config
const getAIClient = () => {
    // The apiKey is injected by Vite define from process.env.API_KEY
    const key = process.env.API_KEY;
    if (!key) throw new Error("API Key not found. Please set API_KEY in .env");
    return new GoogleGenAI({ apiKey: key });
};

// --- Packer Functions (Data Minimization) ---

const packActorData = (t: Token): string => {
    if (!isActor(t)) return '';
    const actor = t as Actor;
    return `- ${actor.name} (HP: ${actor.hp}/${actor.maxHp}, AC: ${actor.ac}, Status: ${actor.statusEffects?.map(e=>e.id).join(', ') || 'None'})`;
};

const packMonsterStatBlock = (m: Actor): string => {
    if (!m.monsterData) return "Unknown Monster";
    const md = m.monsterData;
    // Strip flavor text, keep mechanics
    const actions = md.actions.map(a => `${a.name} (${a.type}): ${a.desc}`).join('; ');
    const spells = md.spellcasting ? `Spells: ${md.spellcasting.spells.join(', ')}` : '';
    return `Name: ${md.name}. Type: ${md.type}. Stats: Str${md.stats.str} Dex${md.stats.dex} Int${md.stats.int}. Actions: ${actions}. ${spells}`;
};

// --- API Methods ---

export const generateDMNarration = async (
  history: LogEntry[],
  userAction: string,
  context: string,
  visibleTokens: Token[] = []
): Promise<DMResponse> => {
    try {
        const ai = getAIClient();
        const visibleTokenData = visibleTokens.filter(isActor).map(packActorData).join('\n');
        
        const prompt = `
Context: ${context}
Visible Characters:
${visibleTokenData}

Action: ${userAction}
Instructions: Narrate the outcome. Use tools for damage/healing/conditions.
        `;

        // Filter history to last 10 messages
        const chatHistory = history.slice(-10).map(log => ({
            role: log.sender === 'DM' ? 'model' : 'user',
            parts: [{ text: log.content }],
        }));

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [...chatHistory, { role: 'user', parts: [{ text: prompt }] }],
            config: {
                systemInstruction: DM_SYSTEM_INSTRUCTION,
                tools: [{ functionDeclarations: dmTools }],
                temperature: 0.7
            }
        });

        return {
            text: response.text || "",
            toolCalls: response.functionCalls?.map(fc => ({
                name: fc.name,
                args: fc.args
            }))
        };
    } catch (e: any) {
        return { text: `The connection to the ether is disrupted. (${e.message})` };
    }
};

export const generateCombatStrategy = async (
    monster: Token,
    gameState: GameState
): Promise<CombatStrategy | null> => {
    if (!isActor(monster)) return null;
    
    try {
        const ai = getAIClient();
        const tacticalContext = getTacticalContext(monster, gameState);
        const monsterStatBlock = packMonsterStatBlock(monster as Actor);
        
        const allies = gameState.tokens
            .filter(t => isActor(t) && t.type !== 'PLAYER' && t.id !== monster.id && (t.hp || 0) > 0)
            .map(t => `${t.name} (Dist: ${Math.round(Math.sqrt(Math.pow(t.x-monster.x, 2) + Math.pow(t.y-monster.y, 2))*5)}ft)`)
            .join(', ');

        const prompt = `
Monster: ${monsterStatBlock}
Enemies: ${tacticalContext}
Allies: ${allies}

Determine optimal turn. Return JSON.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [{ text: prompt }] },
            config: {
                systemInstruction: COMBAT_SYSTEM_INSTRUCTION,
                responseMimeType: "application/json",
                responseSchema: combatStrategySchema
            }
        });

        const text = response.text;
        return text ? JSON.parse(text) : null;
    } catch (e) {
        console.warn("Strategy Gen Failed", e);
        return null;
    }
};

export const generateMapImage = async (prompt: string, size: '1K' | '2K' | '4K', aspectRatio: string): Promise<string | null> => {
    try {
        const ai = getAIClient();
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: { parts: [{ text: prompt }] },
            config: {
                imageConfig: {
                    imageSize: size || '1K',
                    aspectRatio: aspectRatio || '16:9'
                }
            }
        });

        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                }
            }
        }
        return null;
    } catch (e) {
        console.error("Map Gen Failed", e);
        return null;
    }
};

export const editImage = async (imageBase64: string, prompt: string): Promise<string | null> => {
    try {
        const ai = getAIClient();
        const base64Data = imageBase64.split(',')[1] || imageBase64;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
                    { text: prompt }
                ]
            }
        });

        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                }
            }
        }
        return null;
    } catch (e) {
        return null;
    }
};

export const analyzeMapLayout = async (imageBase64: string, gridSize: GridSize): Promise<MapAnalysis | null> => {
    try {
        const ai = getAIClient();
        const base64Data = imageBase64.split(',')[1] || imageBase64;
        const prompt = `Analyze this battle map (${gridSize.cols}x${gridSize.rows}). Identify spawn points and terrain features. Return JSON.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
                    { text: prompt }
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: mapAnalysisSchema
            }
        });

        const text = response.text;
        return text ? JSON.parse(text) : null;
    } catch (e) {
        return null;
    }
};

export const analyzeImage = async (imageBase64: string, prompt: string): Promise<string> => {
    try {
        const ai = getAIClient();
        const base64Data = imageBase64.split(',')[1] || imageBase64;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', 
            contents: {
                parts: [
                    { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
                    { text: prompt || "Describe this image." }
                ]
            }
        });
        return response.text || "";
    } catch (e: any) {
        return `Error: ${e.message}`;
    }
};

export const searchWorldInfo = async (query: string): Promise<MapSearchResult> => {
    try {
        const ai = getAIClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [{ text: `Find real world lore or location info for: ${query}` }] },
            config: {
                tools: [{ googleSearch: {} }]
            }
        });

        const links: { title: string; uri: string }[] = [];
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks) {
            chunks.forEach((c: any) => {
                if (c.web?.uri) links.push({ title: c.web.title || 'Link', uri: c.web.uri });
            });
        }

        return { text: response.text || "No results.", links };
    } catch (e: any) {
        return { text: `Search Error: ${e.message}`, links: [] };
    }
};

export const askOracle = async (prompt: string): Promise<string> => {
    try {
        const ai = getAIClient();
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: { parts: [{ text: prompt }] },
            config: {
                systemInstruction: "You are a wise ancient oracle. Answer riddles and lore questions cryptically but helpfully."
            }
        });
        return response.text || "The stars are silent.";
    } catch (e: any) {
        return `The Oracle is silent: ${e.message}`;
    }
};

export const analyzeLore = async (context: string, query: string): Promise<string> => {
    try {
        const ai = getAIClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { 
                parts: [{ 
                    text: `Context:\n${context}\n\nTask: ${query || 'Analyze this text.'}` 
                }] 
            },
            config: {
                systemInstruction: "You are an expert Lorekeeper. Analyze the text, extract secrets, and summarize."
            }
        });
        return response.text || "";
    } catch (e: any) {
        return `Analysis Failed: ${e.message}`;
    }
};
