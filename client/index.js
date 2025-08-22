import { config } from "dotenv";
config();
import readline from 'readline/promises';
import { GoogleGenAI } from '@google/genai';
import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {SSEClientTransport} from '@modelcontextprotocol/sdk/client/sse.js';

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
const mcpClient = new Client({
    name: "example-client",
    version: "1.0.0"
});

let tools = [];
const chathistory=[];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

mcpClient.connect(new SSEClientTransport(new URL("http://localhost:3001/sse")))
.then( async() => {
    tools = (await mcpClient.listTools()).tools.map(tool =>{
        return {
            name: tool.name,
            description: tool.description,
            parameters: {
                type: tool.inputSchema.type,
                properties: tool.inputSchema.properties,
                required: tool.inputSchema.required
            }
        };
    });
    chatloop();
});

async function chatloop() {

    while (true) {
        const question = await rl.question("You: ");
        if (question.trim().toLowerCase() === "exit") {
            rl.close();
            break;
        }
        chathistory.push({
            role: "user",
            parts: [
                {
                    text: question,
                    type: "text"
                }
            ]
        });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: chathistory,
            config: {
                tools: [
                    {
                        functionDeclarations: tools,
                    }
                ],
            }
        });
        const functioncall=response.candidates[0].content.parts[0].functionCall;
        const responsetext = response.candidates[0].content.parts[0].text;

        if (functioncall) {
            console.log(`Calling tool ${functioncall.name}`);
            chathistory.push({
                role: "model",
                parts: [
                    {
                        text: `Calling tool ${functioncall.name} with arguments ${JSON.stringify(functioncall.args)}`,
                        type: "text"
                    }
             ]
            });
            const toolresult = await mcpClient.callTool({
                name: functioncall.name,
                arguments: functioncall.args 
            });
            chathistory.push({
                role: "user",
                parts: [
                    {
                        text: toolresult.content[0].text,
                        type: "text"
                    }
              ]
            });
            console.log(toolresult.content[0].text);
            continue;
        }
        chathistory.push({
            role: "model",
            parts: [
                {
                    text: responsetext,
                    type: "text"
                }
            ]
        });
        console.log(`Ai: ${responsetext}`);
    }
    process.exit(0);
}