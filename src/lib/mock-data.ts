import { faker } from "@faker-js/faker";
import {
  TProjectFolder,
  TProjectChat,
  THistoryFolder,
  THistoryChat,
  TBotFolder,
  TBotChat,
} from "./types";

export const generateMockProjectFolders = (
  count: number = 10
): TProjectFolder[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    description: faker.company.catchPhrase(),
    systemPrompt: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(["active", "archived", "draft"]),
    archived: faker.datatype.boolean(),
    createdAt: faker.date.past().getTime(),
    updatedAt: faker.date.recent().getTime(),
  }));
};

export const generateMockProjectChats = (
  projectId: string,
  count: number = 10
): TProjectChat[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    mode: faker.helpers.arrayElement(["chat", "completion"]),
    projectId,
    usedForPersonalization: faker.datatype.boolean(),
    createdAt: faker.date.past().getTime(),
    updatedAt: faker.date.recent().getTime(),
  }));
};

// Mock data for history
export const generateMockHistoryFolderTree = (): THistoryFolder[] => {
  // Predefined folders with detailed data
  return [
    {
      id: "2a6b464d-3211-4cd1-b77f-3476b1012cf6",
      name: "import_from_chatgpt_5",
      chats: Array.from({ length: 12 }, () => ({
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        mode: "UNIFIED_CHAT",
        chatFolderId: "2a6b464d-3211-4cd1-b77f-3476b1012cf6",
        lastMessageContent: faker.lorem.paragraph(),
        type: "file",
        createdAt: faker.date.past().getTime(),
        updatedAt: faker.date.recent().getTime(),
      })),
      createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
      updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
    },
    {
      id: "38a86153-57dc-4d86-86c1-b92bc9e86b58",
      name: "import_from_chatgpt_1",
      chats: Array.from({ length: 5 }, () => ({
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        mode: "UNIFIED_CHAT",
        chatFolderId: "38a86153-57dc-4d86-86c1-b92bc9e86b58",
        lastMessageContent: faker.lorem.paragraph(),
        type: "file",
        createdAt: faker.date.past().getTime(),
        updatedAt: faker.date.recent().getTime(),
      })),
      createdAt: Date.now() - 60 * 24 * 60 * 60 * 1000, // 60 days ago
      updatedAt: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 days ago
    },
    {
      id: faker.string.uuid(),
      name: "Personal Projects",
      chats: Array.from({ length: 8 }, () => ({
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        mode: "UNIFIED_CHAT",
        chatFolderId: "38a86153-57dc-4d86-86c1-b92bc9e86b58",
        lastMessageContent: faker.lorem.paragraph(),
        type: "file",
        createdAt: faker.date.past().getTime(),
        updatedAt: faker.date.recent().getTime(),
      })),
      createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000, // 45 days ago
      updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    },
  ];
};

export const generateMockHistoryChats = (
  count: number = 20
): THistoryChat[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    updatedAt: faker.date.recent().getTime(),
    mode: "UNIFIED_CHAT",
    chatFolderId: Math.random() > 0.3 ? faker.string.uuid() : undefined,
    lastMessageContent: faker.lorem.paragraph(),
  }));
};

// Mock data for bots
export const generateMockBotFolderTree = (): TBotFolder[] => {
  // Predefined folders with detailed data
  return [
    {
      id: "a1b2c3d4-1234-5678-abcd-ef1234567890",
      name: "AI Assistants",
      description: "General purpose AI assistants for various tasks",
      chats: Array.from({ length: 8 }, () => ({
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        mode: "BOT_CHAT",
        botFolderId: "a1b2c3d4-1234-5678-abcd-ef1234567890",
        lastMessageContent: faker.lorem.paragraph(),
        type: "bot",
        createdAt: faker.date.past().getTime(),
        updatedAt: faker.date.recent().getTime(),
      })),
      createdAt: Date.now() - 60 * 24 * 60 * 60 * 1000, // 60 days ago
      updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    },
    {
      id: "b2c3d4e5-2345-6789-bcde-fg2345678901",
      name: "Code Assistants",
      description: "Specialized bots for coding and development tasks",
      chats: Array.from({ length: 5 }, () => ({
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        mode: "BOT_CHAT",
        botFolderId: "b2c3d4e5-2345-6789-bcde-fg2345678901",
        lastMessageContent: faker.lorem.paragraph(),
        type: "bot",
        createdAt: faker.date.past().getTime(),
        updatedAt: faker.date.recent().getTime(),
      })),
      createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000, // 45 days ago
      updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
    },
    {
      id: "c3d4e5f6-3456-7890-cdef-gh3456789012",
      name: "Creative Assistants",
      description: "Bots for creative writing, design, and ideation",
      chats: Array.from({ length: 10 }, () => ({
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        mode: "BOT_CHAT",
        botFolderId: "c3d4e5f6-3456-7890-cdef-gh3456789012",
        lastMessageContent: faker.lorem.paragraph(),
        type: "bot",
        createdAt: faker.date.past().getTime(),
        updatedAt: faker.date.recent().getTime(),
      })),
      createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
      updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
    },
  ];
};

export const generateMockBotChats = (count: number = 20): TBotChat[] => {
  const models = ["GPT-4", "Claude 3", "Gemini", "Llama 3", "Mistral"];

  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    updatedAt: faker.date.recent().getTime(),
    mode: "BOT_CHAT",
    botFolderId: Math.random() > 0.3 ? faker.string.uuid() : undefined,
    lastMessageContent: faker.lorem.paragraph(),
    model: faker.helpers.arrayElement(models),
  }));
};
