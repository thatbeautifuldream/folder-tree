import { QO, QOI } from "@/lib/react-query/query-options";
import { useProjectStore } from "@/store/project.store";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useProjectFolders = () => {
  const { setFolders, setLoadingFolders } = useProjectStore();

  const query = useQuery(QO.ListProjectFolders);

  useEffect(() => {
    setLoadingFolders(query.isLoading || query.isFetching);
  }, [query.isLoading, query.isFetching, setLoadingFolders]);

  useEffect(() => {
    if (query.data) {
      setFolders(query.data.projectFoldersTree);
    }
  }, [query.data, setFolders]);

  return query;
};

export const useProjectChats = (projectId: string | null) => {
  const { setProjectChats, setLoadingChats, updateChatsPagination } =
    useProjectStore();

  const query = useInfiniteQuery({
    ...QOI.GetProjectChats({ projectId: projectId! }),
    enabled: !!projectId,
  });

  // Handle loading state
  useEffect(() => {
    if (projectId) {
      setLoadingChats(projectId, query.isLoading || query.isFetching);
    }
  }, [projectId, query.isLoading, query.isFetching, setLoadingChats]);

  // Handle data updates
  useEffect(() => {
    if (query.data && projectId) {
      const allChats = query.data.pages.flatMap((page) => page.history);
      const currentPage = query.data.pages.length;
      const hasMore = query.hasNextPage ?? false; 

      setProjectChats(projectId, allChats, true);
      updateChatsPagination(projectId, currentPage, hasMore);
    }
  }, [
    query.data,
    query.hasNextPage,
    projectId,
    setProjectChats,
    updateChatsPagination,
  ]);

  return query;
};
