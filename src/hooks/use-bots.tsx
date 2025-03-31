import { QOI } from "@/lib/react-query/query-options";
import { useBotStore } from "@/store/bot.store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useBotChats = () => {
  const { setAllChats, setLoadingChats, updateChatsPagination } = useBotStore();

  const query = useInfiniteQuery(QOI.GetBotChats);

  // Handle loading state
  useEffect(() => {
    setLoadingChats(query.isLoading || query.isFetching);
  }, [query.isLoading, query.isFetching, setLoadingChats]);

  // Handle data updates
  useEffect(() => {
    if (query.data) {
      const allChats = query.data.pages.flatMap((page) => page.chats);
      const currentPage = query.data.pages.length;
      const hasMore = query.hasNextPage ?? false;

      setAllChats(allChats);
      updateChatsPagination(currentPage, hasMore);
    }
  }, [query.data, query.hasNextPage, setAllChats, updateChatsPagination]);

  return query;
};
