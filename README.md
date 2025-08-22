# AI Agent with MCP Server

This project is a conversational AI agent built with Express.js, Google Gemini, and the Model Context Protocol (MCP). It demonstrates tool/function calling, API integration, and multi-turn chat with context. The agent can perform actions such as posting to Twitter and executing arithmetic operations based on natural language prompts.

## Features
- Conversational AI agent using Google Gemini
- Tool/function calling via MCP (Model Context Protocol)
- Twitter API v2 integration for posting tweets
- Arithmetic tool for adding numbers
- Contextual chat history for multi-turn conversations
- Modern JavaScript (ESM), environment-based configuration, and error handling

## Project Structure
```
mcpserver/
├── client/           # CLI chat client
│   ├── index.js
│   └── ...
├── server/           # MCP server and tools
│   ├── index.js
│   ├── createposttool.js
│   └── ...
├── README.md
└── ...
```

## Getting Started

### Prerequisites
- Node.js
- Twitter Developer account (for posting tweets)
- Gemini API key

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Pushkarnsut/AI-Agent-with-MCP-Server.git
   cd AI-Agent-with-MCP-Server
   ```
2. Install dependencies in both `client` and `server`:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
3. Create a `.env` file in both `client` and `server` directories with the required API keys and secrets:
   ```env
   # Example for server/.env
   TWITTER_API_KEY=your_key
   TWITTER_API_SECRET=your_secret
   TWITTER_ACCESS_TOKEN=your_token
   TWITTER_ACCESS_TOKEN_SECRET=your_token_secret
   # Example for client/.env
   GEMINI_API_KEY=your_gemini_key
   ```

### Running the Project
1. Start the MCP server:
   ```bash
   cd server
   node index.js
   ```
2. Start the client (in a new terminal):
   ```bash
   cd client
   node index.js
   ```

## Usage
- Interact with the AI agent in the terminal.
- Example prompts:
  - `add two numbers 2 and 3`
  - `post that I am learning MCP servers today`
- The agent will call the appropriate tool and respond with the result.

## Security
- **Never commit your `.env` files or API secrets to GitHub.**
- `.gitignore` is set up to exclude sensitive files.

## License
MIT

## Author
Pushkarnsut
