import { z } from "zod";

export const ProjectFolderSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  systemPrompt: z.string(),
  status: z.string().optional(),
  archived: z.boolean().default(false),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export const ProjectChatsSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  mode: z.string(),
  projectId: z.string().uuid(),
  usedForPersonalization: z.boolean().default(false),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type TProjectFolder = z.infer<typeof ProjectFolderSchema>;
export type TProjectChat = z.infer<typeof ProjectChatsSchema>;

// History types
export const HistoryFolderSchema = z.object({
  id: z.string(),
  name: z.string(),
  chats: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      mode: z.string(),
      chatFolderId: z.string(),
      lastMessageContent: z.string().optional(),
      type: z.string(),
      createdAt: z.number(),
      updatedAt: z.number(),
    })
  ),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export const HistoryChatSchema = z.object({
  id: z.string(),
  title: z.string(),
  updatedAt: z.number(),
  mode: z.string(),
  chatFolderId: z.string().optional(),
  lastMessageContent: z.string().optional(),
});

export type THistoryFolder = z.infer<typeof HistoryFolderSchema>;
export type THistoryChat = z.infer<typeof HistoryChatSchema>;

// Bot types
export const BotFolderSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  chats: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      mode: z.string(),
      botFolderId: z.string(),
      lastMessageContent: z.string().optional(),
      type: z.string(),
      createdAt: z.number(),
      updatedAt: z.number(),
    })
  ),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export const BotChatSchema = z.object({
  id: z.string(),
  title: z.string(),
  updatedAt: z.number(),
  mode: z.string(),
  botFolderId: z.string().optional(),
  lastMessageContent: z.string().optional(),
  model: z.string().optional(),
});

export type TBotFolder = z.infer<typeof BotFolderSchema>;
export type TBotChat = z.infer<typeof BotChatSchema>;
