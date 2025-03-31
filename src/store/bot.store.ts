import { TBotChat } from "@/lib/types";
import { create } from "zustand";

interface BotState {
  allChats: TBotChat[];
  selectedChatsById: Record<string, Set<string>>;
  chatsPagination: { page: number; hasMore: boolean };
  isLoadingChats: boolean;
  isBotsVisible: boolean;
  // Actions
  setAllChats: (chats: TBotChat[], append?: boolean) => void;
  toggleChatSelection: (chatId: string) => void;
  updateChatsPagination: (page: number, hasMore: boolean) => void;
  setLoadingChats: (loading: boolean) => void;
  setBotsVisibility: (visible: boolean) => void;
}

export const useBotStore = create<BotState>((set) => ({
  allChats: [],
  selectedChatsById: {},
  chatsPagination: { page: 1, hasMore: false },
  isLoadingChats: false,
  isBotsVisible: true,

  setAllChats: (chats, append = false) =>
    set((state) => ({
      allChats: append ? [...state.allChats, ...chats] : chats,
    })),

  toggleChatSelection: (chatId) =>
    set((state) => {
      const folderKey = "all";
      const currentSelected =
        state.selectedChatsById[folderKey] || new Set<string>();
      const newSelected = new Set(currentSelected);

      if (newSelected.has(chatId)) {
        newSelected.delete(chatId);
      } else {
        newSelected.add(chatId);
      }

      return {
        selectedChatsById: {
          ...state.selectedChatsById,
          [folderKey]: newSelected,
        },
      };
    }),

  updateChatsPagination: (page, hasMore) =>
    set({ chatsPagination: { page, hasMore } }),

  setLoadingChats: (loading) => set({ isLoadingChats: loading }),

  setBotsVisibility: (visible) => set({ isBotsVisible: visible }),
}));
