import { THistoryChat, THistoryFolder } from "@/lib/types";
import { create } from "zustand";

interface HistoryState {
  folders: THistoryFolder[];
  allChats: THistoryChat[];
  folderChats: Record<string, THistoryChat[]>;
  openFolderIds: Set<string>;
  selectedChatsById: Record<string, Set<string>>;
  chatsPagination: { page: number; hasMore: boolean };
  folderChatsPagination: Record<string, { page: number; hasMore: boolean }>;
  isLoadingFolders: boolean;
  isLoadingChats: boolean;
  isLoadingFolderChats: Record<string, boolean>;
  isFoldersVisible: boolean;
  isHistoryVisible: boolean;
  // Actions
  setFolders: (folders: THistoryFolder[]) => void;
  setAllChats: (chats: THistoryChat[], append?: boolean) => void;
  setFolderChats: (
    folderId: string,
    chats: THistoryChat[],
    append?: boolean
  ) => void;
  toggleFolder: (folderId: string) => void;
  toggleChatSelection: (folderId: string | null, chatId: string) => void;
  updateChatsPagination: (page: number, hasMore: boolean) => void;
  updateFolderChatsPagination: (
    folderId: string,
    page: number,
    hasMore: boolean
  ) => void;
  setLoadingFolders: (loading: boolean) => void;
  setLoadingChats: (loading: boolean) => void;
  setLoadingFolderChats: (folderId: string, loading: boolean) => void;
  setFoldersVisibility: (visible: boolean) => void;
  setHistoryVisibility: (visible: boolean) => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  folders: [],
  allChats: [],
  folderChats: {},
  openFolderIds: new Set<string>(),
  selectedChatsById: {},
  chatsPagination: { page: 1, hasMore: false },
  folderChatsPagination: {},
  isLoadingFolders: false,
  isLoadingChats: false,
  isLoadingFolderChats: {},
  isFoldersVisible: true,
  isHistoryVisible: true,

  setFolders: (folders) => set({ folders }),

  setAllChats: (chats, append = false) =>
    set((state) => ({
      allChats: append ? [...state.allChats, ...chats] : chats,
    })),

  setFolderChats: (folderId, chats, append = false) =>
    set((state) => ({
      folderChats: {
        ...state.folderChats,
        [folderId]: append
          ? [...(state.folderChats[folderId] || []), ...chats]
          : chats,
      },
    })),

  toggleFolder: (folderId) =>
    set((state) => {
      const newOpenFolderIds = new Set(state.openFolderIds);
      if (newOpenFolderIds.has(folderId)) {
        newOpenFolderIds.delete(folderId);
      } else {
        newOpenFolderIds.add(folderId);
      }
      return { openFolderIds: newOpenFolderIds };
    }),

  toggleChatSelection: (folderId, chatId) =>
    set((state) => {
      const folderKey = folderId || "uncategorized";
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

  updateFolderChatsPagination: (folderId, page, hasMore) =>
    set((state) => ({
      folderChatsPagination: {
        ...state.folderChatsPagination,
        [folderId]: { page, hasMore },
      },
    })),

  setLoadingFolders: (loading) => set({ isLoadingFolders: loading }),

  setLoadingChats: (loading) => set({ isLoadingChats: loading }),

  setLoadingFolderChats: (folderId, loading) =>
    set((state) => ({
      isLoadingFolderChats: {
        ...state.isLoadingFolderChats,
        [folderId]: loading,
      },
    })),

  setFoldersVisibility: (visible) => set({ isFoldersVisible: visible }),

  setHistoryVisibility: (visible) => set({ isHistoryVisible: visible }),
}));
