/**
 * Greeting Generation and Storage
 * Handles creating customized greetings and tracking statistics
 */

import { corgiTeam, getRandomCorgi, getRandomPun, type CorgiMember } from "./corgi-team.js";

export type Mood = "happy" | "tired" | "stressed" | "excited" | "neutral";
export type Occasion =
  | "morning"
  | "afternoon"
  | "evening"
  | "project_start"
  | "project_end"
  | "celebration"
  | "general";

interface GreetingRecord {
  timestamp: Date;
  corgi: string;
  mood?: Mood;
  occasion?: Occasion;
  greeting: string;
}

interface GreetingStats {
  totalGreetings: number;
  greetingsByCorgi: Record<string, number>;
  greetingsByMood: Record<string, number>;
  greetingsByOccasion: Record<string, number>;
  customGreetingsCount: number;
}

// In-memory storage (resets on server restart)
const greetingHistory: GreetingRecord[] = [];
const MAX_HISTORY_SIZE = 1000; // Limit history to prevent memory issues

// Helper function to add record with size limit
function addGreetingRecord(record: GreetingRecord): void {
  greetingHistory.push(record);
  // Keep only the most recent MAX_HISTORY_SIZE records
  if (greetingHistory.length > MAX_HISTORY_SIZE) {
    greetingHistory.shift(); // Remove oldest record
  }
}

const customGreetings: string[] = [];

/**
 * Get a customized greeting based on mood and occasion
 */
export function getGreeting(
  mood?: Mood,
  occasion?: Occasion,
  preferredCorgi?: string
): { corgi: CorgiMember; greeting: string } {
  // Select corgi based on context or preference
  let corgi: CorgiMember;

  if (preferredCorgi) {
    const key = preferredCorgi.toLowerCase();
    if (key.includes("captain")) corgi = corgiTeam.captain;
    else if (key.includes("charlie")) corgi = corgiTeam.charlie;
    else if (key.includes("cinnamon")) corgi = corgiTeam.cinnamon;
    else if (key.includes("code")) corgi = corgiTeam.code;
    else corgi = getRandomCorgi();
  } else {
    // Smart selection based on mood/occasion
    corgi = selectCorgiByContext(mood, occasion);
  }

  // Generate greeting
  let greeting = generateContextualGreeting(corgi, mood, occasion);

  // Record the greeting
  addGreetingRecord({
    timestamp: new Date(),
    corgi: corgi.name,
    mood,
    occasion,
    greeting,
  });

  return { corgi, greeting };
}

/**
 * Select the most appropriate corgi based on context
 */
function selectCorgiByContext(mood?: Mood, occasion?: Occasion): CorgiMember {
  // Mood-based selection
  if (mood === "stressed" || mood === "tired") {
    return corgiTeam.cinnamon; // Comfort specialist
  }
  if (mood === "excited") {
    return corgiTeam.charlie; // Enthusiasm expert
  }

  // Occasion-based selection
  if (occasion === "project_start") {
    return corgiTeam.captain; // Formal welcomes
  }
  if (occasion === "celebration" || occasion === "project_end") {
    return corgiTeam.charlie; // Celebrations
  }
  if (occasion === "morning") {
    // Morning rotation between Captain and Charlie
    return Math.random() > 0.5 ? corgiTeam.captain : corgiTeam.charlie;
  }

  // Default to random
  return getRandomCorgi();
}

/**
 * Generate a greeting tailored to the context
 */
function generateContextualGreeting(
  corgi: CorgiMember,
  mood?: Mood,
  occasion?: Occasion
): string {
  // Get a base greeting
  const baseGreeting =
    corgi.greetings[Math.floor(Math.random() * corgi.greetings.length)];

  // Add context-specific additions
  let addition = "";

  if (mood === "stressed" && corgi.name === "Cozy Cinnamon") {
    addition = " Remember to take breaks—you're doing great! 🌻";
  } else if (mood === "tired" && corgi.name === "Cozy Cinnamon") {
    addition = " It's okay to rest. Tomorrow is a new day. ☕";
  } else if (occasion === "celebration" && corgi.name === "Cheerful Charlie") {
    addition = " TIME TO PARTY! 🎊🎊🎊";
  } else if (corgi.name === "Code Corgi" && Math.random() > 0.5) {
    addition = ` Fun fact: ${getRandomPun()}`;
  }

  return baseGreeting + addition;
}

/**
 * Add a custom greeting to the collection
 */
export function addCustomGreeting(greeting: string): {
  success: boolean;
  message: string;
} {
  if (!greeting || greeting.trim().length === 0) {
    return { success: false, message: "Greeting cannot be empty" };
  }

  if (greeting.length > 500) {
    return {
      success: false,
      message: "Greeting too long (max 500 characters)",
    };
  }

  customGreetings.push(greeting.trim());

  return {
    success: true,
    message: `Custom greeting added! You now have ${customGreetings.length} custom greeting(s).`,
  };
}

/**
 * Get greeting statistics
 */
export function getGreetingStats(): GreetingStats {
  const stats: GreetingStats = {
    totalGreetings: greetingHistory.length,
    greetingsByCorgi: {},
    greetingsByMood: {},
    greetingsByOccasion: {},
    customGreetingsCount: customGreetings.length,
  };

  // Count by corgi
  for (const record of greetingHistory) {
    stats.greetingsByCorgi[record.corgi] =
      (stats.greetingsByCorgi[record.corgi] || 0) + 1;

    if (record.mood) {
      stats.greetingsByMood[record.mood] =
        (stats.greetingsByMood[record.mood] || 0) + 1;
    }

    if (record.occasion) {
      stats.greetingsByOccasion[record.occasion] =
        (stats.greetingsByOccasion[record.occasion] || 0) + 1;
    }
  }

  return stats;
}

/**
 * Get today's greeting history
 */
export function getTodayGreetings(): GreetingRecord[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return greetingHistory.filter((record) => {
    const recordDate = new Date(record.timestamp);
    recordDate.setHours(0, 0, 0, 0);
    return recordDate.getTime() === today.getTime();
  });
}

/**
 * Get all custom greetings
 */
export function getCustomGreetings(): string[] {
  return [...customGreetings];
}
