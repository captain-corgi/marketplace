#!/usr/bin/env node
/**
 * Corgi Greeting LSP Server
 *
 * A Language Server Protocol server that provides:
 * - Completions for greeting phrases in comments
 * - Hover information on greeting-related keywords
 * - Diagnostics suggesting friendlier wording
 */

import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  InitializeResult,
  TextDocumentSyncKind,
  CompletionItem,
  CompletionItemKind,
  Hover,
  Diagnostic,
  DiagnosticSeverity,
  TextDocumentPositionParams,
  MarkupKind,
} from "vscode-languageserver/node.js";

import { TextDocument } from "vscode-languageserver-textdocument";

// Create connection and document manager
const connection = createConnection(ProposedFeatures.all);
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

// ============================================================================
// GREETING DATA
// ============================================================================

const greetingCompletions: CompletionItem[] = [
  {
    label: "// Hello! 👋",
    kind: CompletionItemKind.Snippet,
    detail: "Friendly greeting comment",
    insertText: "// Hello! 👋 Welcome to this code!",
    documentation: "A warm welcome from Captain Corgi 🎖️",
  },
  {
    label: "// Welcome!",
    kind: CompletionItemKind.Snippet,
    detail: "Welcome message",
    insertText: "// Welcome! We're glad you're here! 🐕",
    documentation: "Greet new developers reading your code",
  },
  {
    label: "// Good luck!",
    kind: CompletionItemKind.Snippet,
    detail: "Encouraging comment",
    insertText: "// Good luck with this section! You've got this! 💪",
    documentation: "Encouragement from Cozy Cinnamon 🧡",
  },
  {
    label: "// Have fun!",
    kind: CompletionItemKind.Snippet,
    detail: "Fun comment",
    insertText: "// Have fun coding! 🎉",
    documentation: "Cheerful Charlie says hi! 🎉",
  },
  {
    label: "// Happy coding!",
    kind: CompletionItemKind.Snippet,
    detail: "Developer greeting",
    insertText: "// Happy coding! May your builds be green! 💻✨",
    documentation: "Code Corgi wishes you bug-free code!",
  },
  {
    label: "// TODO: Celebrate",
    kind: CompletionItemKind.Snippet,
    detail: "Celebration reminder",
    insertText: "// TODO: Remember to celebrate when this works! 🎊",
    documentation: "Don't forget to celebrate your wins!",
  },
  {
    label: "// Note: Take a break",
    kind: CompletionItemKind.Snippet,
    detail: "Self-care reminder",
    insertText: "// Note: If you've been coding a while, take a break! ☕",
    documentation: "Cozy Cinnamon reminds you to rest 🧡",
  },
];

const corgiHoverInfo: Record<string, { title: string; description: string }> = {
  hello: {
    title: "🎖️ Captain Corgi says:",
    description:
      "\"A proper greeting sets the tone for excellent collaboration!\"",
  },
  welcome: {
    title: "🎖️ Captain Corgi says:",
    description:
      '"It is my distinct pleasure to welcome all who read this code."',
  },
  thanks: {
    title: "🧡 Cozy Cinnamon says:",
    description:
      '"Gratitude makes the codebase a warmer place. Thank you for being here!"',
  },
  todo: {
    title: "💻 Code Corgi says:",
    description:
      "\"TODOs are just future celebrations waiting to happen! You'll get to them!\"",
  },
  fixme: {
    title: "🎉 Cheerful Charlie says:",
    description:
      "\"Every FIXME is an opportunity for improvement! You've got this!\"",
  },
  bug: {
    title: "💻 Code Corgi says:",
    description:
      "\"Why do programmers prefer dark mode? Because light attracts bugs! 🐛\"",
  },
  error: {
    title: "🧡 Cozy Cinnamon says:",
    description:
      '"Errors are just learning opportunities in disguise. Take a breath!"',
  },
  hack: {
    title: "💻 Code Corgi says:",
    description:
      "\"Sometimes a hack today saves a headache tomorrow. No judgment here!\"",
  },
  deprecated: {
    title: "🎖️ Captain Corgi says:",
    description:
      '"Deprecation is the dignified retirement of code that served us well."',
  },
  refactor: {
    title: "💻 Code Corgi says:",
    description: "\"Time to git commit to cleaner code! Let's refactor!\"",
  },
};

// Words that could be made friendlier
const unfriendlyPatterns: Array<{
  pattern: RegExp;
  message: string;
  suggestion: string;
}> = [
  {
    pattern: /\bstupid\b/gi,
    message: "Consider using friendlier language",
    suggestion: 'Try "confusing" or "tricky" instead',
  },
  {
    pattern: /\bdumb\b/gi,
    message: "Consider using friendlier language",
    suggestion: 'Try "unclear" or "surprising" instead',
  },
  {
    pattern: /\bugly\b/gi,
    message: "Consider using friendlier language",
    suggestion: 'Try "could be improved" or "needs refactoring" instead',
  },
  {
    pattern: /\bterrible\b/gi,
    message: "Consider using friendlier language",
    suggestion: 'Try "needs attention" or "challenging" instead',
  },
  {
    pattern: /\bworse\b/gi,
    message: "Cozy Cinnamon suggests positive framing",
    suggestion: 'Try focusing on what could be "better" instead',
  },
];

// ============================================================================
// INITIALIZATION
// ============================================================================

connection.onInitialize((params: InitializeParams): InitializeResult => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        resolveProvider: false,
        triggerCharacters: ["/", "!"],
      },
      hoverProvider: true,
    },
    serverInfo: {
      name: "Corgi Greeting LSP",
      version: "1.0.0",
    },
  };
});

// ============================================================================
// COMPLETIONS
// ============================================================================

connection.onCompletion(
  (params: TextDocumentPositionParams): CompletionItem[] => {
    const document = documents.get(params.textDocument.uri);
    if (!document) return [];

    const line = document
      .getText({
        start: { line: params.position.line, character: 0 },
        end: params.position,
      })
      .trim();

    // Only suggest greetings in comment contexts
    if (line.startsWith("//") || line.startsWith("#") || line.startsWith("*")) {
      return greetingCompletions;
    }

    return [];
  }
);

// ============================================================================
// HOVER
// ============================================================================

connection.onHover((params: TextDocumentPositionParams): Hover | null => {
  const document = documents.get(params.textDocument.uri);
  if (!document) return null;

  // Get the word at cursor position
  const line = document.getText({
    start: { line: params.position.line, character: 0 },
    end: { line: params.position.line + 1, character: 0 },
  });

  // Find word boundaries
  const lineText = line.toLowerCase();

  for (const [keyword, info] of Object.entries(corgiHoverInfo)) {
    if (lineText.includes(keyword)) {
      // Check if cursor is near this keyword
      const keywordIndex = lineText.indexOf(keyword);
      if (
        params.position.character >= keywordIndex &&
        params.position.character <= keywordIndex + keyword.length + 5
      ) {
        return {
          contents: {
            kind: MarkupKind.Markdown,
            value: `### ${info.title}\n\n${info.description}\n\n---\n*From the Corgi Greeting Team 🐕*`,
          },
        };
      }
    }
  }

  return null;
});

// ============================================================================
// DIAGNOSTICS
// ============================================================================

documents.onDidChangeContent((change) => {
  validateDocument(change.document);
});

async function validateDocument(document: TextDocument): Promise<void> {
  const text = document.getText();
  const diagnostics: Diagnostic[] = [];

  // Only check comments (basic heuristic)
  const lines = text.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if line is a comment
    const isComment =
      line.trim().startsWith("//") ||
      line.trim().startsWith("#") ||
      line.trim().startsWith("*") ||
      line.trim().startsWith("/*");

    if (!isComment) continue;

    // Check for unfriendly patterns
    for (const { pattern, message, suggestion } of unfriendlyPatterns) {
      let match;
      pattern.lastIndex = 0; // Reset regex

      while ((match = pattern.exec(line)) !== null) {
        diagnostics.push({
          severity: DiagnosticSeverity.Hint,
          range: {
            start: { line: i, character: match.index },
            end: { line: i, character: match.index + match[0].length },
          },
          message: `🧡 ${message}: ${suggestion}`,
          source: "Corgi Greeting Team",
        });
      }
    }
  }

  connection.sendDiagnostics({ uri: document.uri, diagnostics });
}

// ============================================================================
// SERVER STARTUP
// ============================================================================

documents.listen(connection);
connection.listen();

console.error("Corgi Greeting LSP Server started");
