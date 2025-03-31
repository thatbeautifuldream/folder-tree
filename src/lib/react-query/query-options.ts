import { api } from "@/lib/api";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

const MINUTES_TO_MILLISECONDS = 1000 * 60;

export const QO = {
  ListProjectFolders: queryOptions({
    queryFn: async () => {
      const response = await api.listProjectFolders();
      return response;
    },
    queryKey: ["listProjectFolders"],
    staleTime: MINUTES_TO_MILLISECONDS * 60,
  }),

  ListHistoryFolderTree: queryOptions({
    queryFn: async () => {
      const response = await api.listHistoryFolderTree();
      return response;
    },
    queryKey: ["listHistoryFolderTree"],
    staleTime: MINUTES_TO_MILLISECONDS * 15,
  }),
};

export const QOI = {
  GetProjectChats: ({ projectId }: { projectId: string }) =>
    infiniteQueryOptions({
      queryKey: ["projectChats", projectId],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
        const response = await api.getProjectChats({
          projectId,
          page: pageParam,
          limit: 10,
        });
        return response;
      },
      staleTime: MINUTES_TO_MILLISECONDS * 60,
      getNextPageParam: (lastPage, allPages) => {
        const hasMore = lastPage.history.length === 10;
        return hasMore ? allPages.length + 1 : undefined;
      },
    }),

  GetHistory: infiniteQueryOptions({
    queryKey: ["history"],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.getHistory({
        page: pageParam,
        limit: 10,
      });
      return response;
    },
    staleTime: MINUTES_TO_MILLISECONDS * 15,
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.history.length === 10;
      return hasMore ? allPages.length + 1 : undefined;
    },
  }),

  GetFolderChats: ({ folderId }: { folderId: string }) =>
    infiniteQueryOptions({
      queryKey: ["folderChats", folderId],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
        const response = await api.getFolderChats({
          folderId,
          page: pageParam,
          limit: 10,
        });
        return response;
      },
      staleTime: MINUTES_TO_MILLISECONDS * 15,
      getNextPageParam: (lastPage, allPages) => {
        const hasMore = lastPage.chats.length === 10;
        return hasMore ? allPages.length + 1 : undefined;
      },
    }),

  GetBotChats: infiniteQueryOptions({
    queryKey: ["botChats"],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.getBotChats({
        page: pageParam,
        limit: 10,
      });
      return response;
    },
    staleTime: MINUTES_TO_MILLISECONDS * 15,
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.chats.length === 10;
      return hasMore ? allPages.length + 1 : undefined;
    },
  }),
};
