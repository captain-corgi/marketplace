#!/usr/bin/env node
/**
 * Corgi Greeting MCP Server
 *
 * A Model Context Protocol server that provides greeting tools and resources
 * from the Corgi Greeting Team.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { corgiTeam, getRandomCorgi, getRandomPun } from "./corgi-team.js";
import {
  getGreeting,
  addCustomGreeting,
  getGreetingStats,
  getTodayGreetings,
  getCustomGreetings,
  type Mood,
  type Occasion,
} from "./greetings.js";

// Create the MCP server
const server = new McpServer({
  name: "corgi-greeting-server",
  version: "1.0.0",
});

// ============================================================================
// TOOLS
// ============================================================================

// Tool: get_greeting
server.tool(
  "get_greeting",
  "Get a customized greeting from a Corgi Team member based on mood and occasion",
  {
    mood: z
      .enum(["happy", "tired", "stressed", "excited", "neutral"])
      .optional()
      .describe("Current mood of the user"),
    occasion: z
      .enum([
        "morning",
        "afternoon",
        "evening",
        "project_start",
        "project_end",
        "celebration",
        "general",
      ])
      .optional()
      .describe("The occasion for the greeting"),
    preferred_corgi: z
      .string()
      .optional()
      .describe(
        "Preferred corgi team member (captain, charlie, cinnamon, or code)"
      ),
  },
  async ({ mood, occasion, preferred_corgi }) => {
    const result = getGreeting(
      mood as Mood | undefined,
      occasion as Occasion | undefined,
      preferred_corgi
    );

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              corgi: {
                name: result.corgi.name,
                emoji: result.corgi.emoji,
                role: result.corgi.role,
              },
              greeting: result.greeting,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// Tool: get_random_corgi
server.tool(
  "get_random_corgi",
  "Get information about a random Corgi Team member",
  {},
  async () => {
    const corgi = getRandomCorgi();

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              name: corgi.name,
              emoji: corgi.emoji,
              role: corgi.role,
              specialty: corgi.specialty,
              personality: corgi.personality,
              signaturePhrases: corgi.signaturePhrases,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// Tool: add_custom_greeting
server.tool(
  "add_custom_greeting",
  "Add a custom greeting to the collection",
  {
    greeting: z
      .string()
      .min(1)
      .max(500)
      .describe("The custom greeting to add (max 500 characters)"),
  },
  async ({ greeting }) => {
    const result = addCustomGreeting(greeting);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

// Tool: get_greeting_stats
server.tool(
  "get_greeting_stats",
  "Get statistics about greeting usage",
  {},
  async () => {
    const stats = getGreetingStats();

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(stats, null, 2),
        },
      ],
    };
  }
);

// Tool: get_programming_pun
server.tool(
  "get_programming_pun",
  "Get a random programming pun from Code Corgi",
  {},
  async () => {
    const pun = getRandomPun();

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              from: "Code Corgi 💻",
              pun: pun,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// ============================================================================
// RESOURCES
// ============================================================================

// Resource: corgi://team
server.resource("corgi://team", "Information about all Corgi Team members", async () => {
  const teamInfo = Object.entries(corgiTeam).map(([key, member]) => ({
    id: key,
    name: member.name,
    emoji: member.emoji,
    role: member.role,
    specialty: member.specialty,
    personality: member.personality,
  }));

  return {
    contents: [
      {
        uri: "corgi://team",
        mimeType: "application/json",
        text: JSON.stringify(teamInfo, null, 2),
      },
    ],
  };
});

// Resource: corgi://greetings/today
server.resource(
  "corgi://greetings/today",
  "Today's greeting history",
  async () => {
    const todayGreetings = getTodayGreetings();

    return {
      contents: [
        {
          uri: "corgi://greetings/today",
          mimeType: "application/json",
          text: JSON.stringify(
            {
              date: new Date().toISOString().split("T")[0],
              count: todayGreetings.length,
              greetings: todayGreetings,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// Resource: corgi://greetings/custom
server.resource(
  "corgi://greetings/custom",
  "User's custom greetings collection",
  async () => {
    const customGreetings = getCustomGreetings();

    return {
      contents: [
        {
          uri: "corgi://greetings/custom",
          mimeType: "application/json",
          text: JSON.stringify(
            {
              count: customGreetings.length,
              greetings: customGreetings,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// ============================================================================
// SERVER STARTUP
// ============================================================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Corgi Greeting MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
