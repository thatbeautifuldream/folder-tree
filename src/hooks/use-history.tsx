import { QO, QOI } from "@/lib/react-query/query-options";
import { useHistoryStore } from "@/store/history.store";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useHistoryFolders = () => {
  const { setFolders, setLoadingFolders } = useHistoryStore();

  const query = useQuery(QO.ListHistoryFolderTree);

  useEffect(() => {
    setLoadingFolders(query.isLoading || query.isFetching);
  }, [query.isLoading, query.isFetching, setLoadingFolders]);

  useEffect(() => {
    if (query.data) {
      setFolders(query.data.tree);
    }
  }, [query.data, setFolders]);

  return query;
};

export const useHistoryChats = () => {
  const { setAllChats, setLoadingChats, updateChatsPagination } =
    useHistoryStore();

  const query = useInfiniteQuery(QOI.GetHistory);

  // Handle loading state
  useEffect(() => {
    setLoadingChats(query.isLoading || query.isFetching);
  }, [query.isLoading, query.isFetching, setLoadingChats]);

  // Handle data updates
  useEffect(() => {
    if (query.data) {
      const allChats = query.data.pages.flatMap((page) => page.history);
      const currentPage = query.data.pages.length;
      const hasMore = query.hasNextPage ?? false;

      setAllChats(allChats);
      updateChatsPagination(currentPage, hasMore);
    }
  }, [query.data, query.hasNextPage, setAllChats, updateChatsPagination]);

  return query;
};

export const useFolderChats = (folderId: string | null) => {
  const { setFolderChats, setLoadingFolderChats, updateFolderChatsPagination } =
    useHistoryStore();

  const query = useInfiniteQuery({
    ...QOI.GetFolderChats({ folderId: folderId! }),
    enabled: !!folderId,
  });

  // Handle loading state
  useEffect(() => {
    if (folderId) {
      setLoadingFolderChats(folderId, query.isLoading || query.isFetching);
    }
  }, [folderId, query.isLoading, query.isFetching, setLoadingFolderChats]);

  // Handle data updates
  useEffect(() => {
    if (query.data && folderId) {
      const allChats = query.data.pages.flatMap((page) => page.chats);
      const currentPage = query.data.pages.length;
      const hasMore = query.hasNextPage ?? false;

      setFolderChats(folderId, allChats);
      updateFolderChatsPagination(folderId, currentPage, hasMore);
    }
  }, [
    query.data,
    query.hasNextPage,
    folderId,
    setFolderChats,
    updateFolderChatsPagination,
  ]);

  return query;
};
