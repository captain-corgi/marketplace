/**
 * Corgi Team Member Definitions
 * Contains all information about the Corgi Greeting Team members
 */

export interface CorgiMember {
  name: string;
  emoji: string;
  role: string;
  specialty: string;
  personality: string[];
  signaturePhrases: string[];
  greetings: string[];
}

export const corgiTeam: Record<string, CorgiMember> = {
  captain: {
    name: "Captain Corgi",
    emoji: "🎖️",
    role: "Team Leader",
    specialty: "Formal, professional greetings and official welcomes",
    personality: ["Dignified", "Professional", "Reliable", "Respectful"],
    signaturePhrases: [
      "It is my distinct pleasure to welcome you...",
      "On behalf of the Corgi Greeting Team...",
      "We are honored by your presence...",
    ],
    greetings: [
      "Good day! It is my distinct pleasure to welcome you. I am Captain Corgi, and the team stands ready to assist. 🎖️",
      "Greetings, esteemed colleague! On behalf of the Corgi Greeting Team, we extend our warmest welcome. 👋",
      "A cordial hello to you! May your endeavors today be met with success and satisfaction. 🐕",
      "Welcome! It is an honor to have you here. The Corgi Greeting Team is at your service. 🎖️",
    ],
  },
  charlie: {
    name: "Cheerful Charlie",
    emoji: "🎉",
    role: "Enthusiasm Expert",
    specialty: "Casual greetings, celebrations, and spreading joy",
    personality: ["Energetic", "Playful", "Optimistic", "Celebratory"],
    signaturePhrases: [
      "Woohoo! This is going to be amazing!",
      "Hey there, superstar!",
      "Time to celebrate!",
    ],
    greetings: [
      "Heyyy there! 🎉 So excited you're here! This is going to be awesome! 🐕✨",
      "WOOHOO! Welcome welcome welcome! Ready for an amazing day? Let's gooo! 🚀🎊",
      "Hey superstar! 🌟 Charlie here, and I just KNOW today is going to be fantastic! 🐾",
      "OMG HI! 🎉 You made it! This is literally the best thing ever! Let's have fun! ✨",
    ],
  },
  cinnamon: {
    name: "Cozy Cinnamon",
    emoji: "🧡",
    role: "Comfort Specialist",
    specialty: "Supportive, encouraging messages and emotional warmth",
    personality: ["Warm", "Empathetic", "Patient", "Supportive", "Gentle"],
    signaturePhrases: [
      "Take a deep breath—you've got this.",
      "I'm proud of you for being here.",
      "It's okay to take things one step at a time.",
    ],
    greetings: [
      "Hey there, friend 🧡 Just wanted to check in and remind you that you're doing great. Take your time—there's no rush.",
      "Hello, lovely human 🤗 Whatever brought you here today, know that you're in good paws. We've got this together.",
      "Hi there ☕ Cinnamon here, sending you a warm little hello. Remember: progress, not perfection. You're doing wonderfully.",
      "Welcome, dear friend 🧡 I'm so glad you're here. Take a breath, settle in, and know that you're appreciated.",
    ],
  },
  code: {
    name: "Code Corgi",
    emoji: "💻",
    role: "Developer Buddy",
    specialty: "Programming puns, developer greetings, and tech humor",
    personality: ["Nerdy", "Witty", "Helpful", "Playful", "Curious"],
    signaturePhrases: [
      "Hello, World!",
      "Let's squash some bugs together!",
      "Time to git commit to greatness!",
      "LGTM! 👍",
    ],
    greetings: [
      "Hello, World! 💻 Code Corgi here, ready to help you push some awesome code! Let's git this bread! 🚀",
      "Greetings, fellow developer! 🐕 No bugs in this welcome message—I've tested it thoroughly. console.log('You are awesome!'); ⌨️",
      "Hey there! 👋 Ready to refactor your day into something amazing? Let's compile some happiness! 💻✨",
      "Welcome to the repo! 🚀 I'm Code Corgi, and I promise this session will have zero runtime errors! Let's code! 💻",
    ],
  },
};

export const programmingPuns = [
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "I'd tell you a UDP joke, but you might not get it.",
  "There are only 10 types of people: those who understand binary and those who don't.",
  "A SQL query walks into a bar, sees two tables and asks: 'Can I join you?'",
  "Why was the JavaScript developer sad? Because he didn't Node how to Express himself!",
  "What's a programmer's favorite hangout place? Foo Bar!",
  "Why do Java developers wear glasses? Because they don't C#!",
  "git commit -m 'I have no idea what I'm doing' 😅",
];

export function getRandomCorgi(): CorgiMember {
  const members = Object.values(corgiTeam);
  return members[Math.floor(Math.random() * members.length)];
}

export function getCorgiByName(name: string): CorgiMember | undefined {
  const key = name.toLowerCase().replace(/[^a-z]/g, "");
  if (key.includes("captain")) return corgiTeam.captain;
  if (key.includes("charlie")) return corgiTeam.charlie;
  if (key.includes("cinnamon")) return corgiTeam.cinnamon;
  if (key.includes("code")) return corgiTeam.code;
  return undefined;
}

export function getRandomPun(): string {
  return programmingPuns[Math.floor(Math.random() * programmingPuns.length)];
}
