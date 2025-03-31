import { TProjectChat, TProjectFolder } from "@/lib/types";
import { create } from "zustand";

interface ProjectState {
  folders: TProjectFolder[];
  openFolderIds: Set<string>;
  projectChats: Record<string, TProjectChat[]>;
  selectedChatsById: Record<string, Set<string>>;
  chatsPagination: Record<string, { page: number; hasMore: boolean }>;
  isLoadingFolders: boolean;
  isLoadingChats: Record<string, boolean>;
  isProjectsVisible: boolean;
  // Actions
  setFolders: (folders: TProjectFolder[]) => void;
  toggleFolder: (folderId: string) => void;
  setProjectChats: (
    projectId: string,
    chats: TProjectChat[],
    append?: boolean
  ) => void;
  toggleChatSelection: (projectId: string, chatId: string) => void;
  updateChatsPagination: (
    projectId: string,
    page: number,
    hasMore: boolean
  ) => void;
  setLoadingFolders: (loading: boolean) => void;
  setLoadingChats: (projectId: string, loading: boolean) => void;
  setProjectsVisibility: (visible: boolean) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  folders: [],
  openFolderIds: new Set<string>(),
  projectChats: {},
  selectedChatsById: {},
  chatsPagination: {},
  isLoadingFolders: false,
  isLoadingChats: {},
  isProjectsVisible: true,

  setFolders: (folders) => set({ folders }),

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

  setProjectChats: (projectId, chats, append = false) =>
    set((state) => ({
      projectChats: {
        ...state.projectChats,
        [projectId]: append
          ? [...(state.projectChats[projectId] || []), ...chats]
          : chats,
      },
    })),

  toggleChatSelection: (projectId, chatId) =>
    set((state) => {
      const currentSelected =
        state.selectedChatsById[projectId] || new Set<string>();
      const newSelected = new Set(currentSelected);

      if (newSelected.has(chatId)) {
        newSelected.delete(chatId);
      } else {
        newSelected.add(chatId);
      }

      return {
        selectedChatsById: {
          ...state.selectedChatsById,
          [projectId]: newSelected,
        },
      };
    }),

  updateChatsPagination: (projectId, page, hasMore) =>
    set((state) => ({
      chatsPagination: {
        ...state.chatsPagination,
        [projectId]: { page, hasMore },
      },
    })),

  setLoadingFolders: (loading) => set({ isLoadingFolders: loading }),

  setLoadingChats: (projectId, loading) =>
    set((state) => ({
      isLoadingChats: {
        ...state.isLoadingChats,
        [projectId]: loading,
      },
    })),

  setProjectsVisibility: (visible) => set({ isProjectsVisible: visible }),
}));
