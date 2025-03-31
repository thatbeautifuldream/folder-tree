import {
  generateMockProjectChats,
  generateMockProjectFolders,
  generateMockHistoryFolderTree,
  generateMockHistoryChats,
  generateMockBotChats,
} from "./mock-data";
import {
  TProjectFolder,
  TProjectChat,
  THistoryFolder,
  THistoryChat,
  TBotChat,
} from "./types";
import { faker } from "@faker-js/faker";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Project endpoints
  listProjectFolders: async (): Promise<{
    projectFoldersTree: TProjectFolder[];
  }> => {
    await delay(500);
    return {
      projectFoldersTree: generateMockProjectFolders(15),
    };
  },

  getProjectChats: async ({
    projectId,
    page = 1,
    limit = 10,
  }: {
    projectId: string;
    page: number;
    limit: number;
  }): Promise<{ history: TProjectChat[] }> => {
    await delay(800);

    // Generate total items for pagination simulation
    const totalItems = 35;
    const start = (page - 1) * limit;
    const hasMore = start + limit < totalItems;

    // Generate mock chats for the current page
    const chats = generateMockProjectChats(
      projectId,
      hasMore ? limit : totalItems - start
    );

    return {
      history: chats,
    };
  },

  // History endpoints
  listHistoryFolderTree: async (): Promise<{
    tree: THistoryFolder[];
  }> => {
    await delay(600);
    return {
      tree: generateMockHistoryFolderTree(),
    };
  },

  getHistory: async ({
    page = 1,
    limit = 10,
  }: {
    page: number;
    limit: number;
  }): Promise<{ history: THistoryChat[] }> => {
    await delay(700);

    // Generate total items for pagination simulation
    const totalItems = 45;
    const start = (page - 1) * limit;
    const hasMore = start + limit < totalItems;

    // Generate mock chats for the current page
    const chats = generateMockHistoryChats(
      hasMore ? limit : totalItems - start
    );

    return {
      history: chats,
    };
  },

  // Get history chats for a specific folder with pagination
  getFolderChats: async ({
    folderId,
    page = 1,
    limit = 10,
  }: {
    folderId: string;
    page: number;
    limit: number;
  }): Promise<{ chats: THistoryChat[] }> => {
    await delay(800);

    // Generate total items for pagination simulation
    const totalItems = 25;
    const start = (page - 1) * limit;
    const hasMore = start + limit < totalItems;

    // Generate mock chats for the current page
    const chats = Array.from(
      { length: hasMore ? limit : totalItems - start },
      () => ({
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        updatedAt: faker.date.recent().getTime(),
        mode: "UNIFIED_CHAT",
        chatFolderId: folderId,
        lastMessageContent: faker.lorem.paragraph(),
      })
    );

    return {
      chats,
    };
  },

  // Bot endpoints
  getBotChats: async ({
    page = 1,
    limit = 10,
  }: {
    page: number;
    limit: number;
  }): Promise<{ chats: TBotChat[] }> => {
    await delay(700);

    // Generate total items for pagination simulation
    const totalItems = 45;
    const start = (page - 1) * limit;
    const hasMore = start + limit < totalItems;

    // Generate mock chats for the current page
    const chats = generateMockBotChats(hasMore ? limit : totalItems - start);

    return {
      chats,
    };
  },
};
