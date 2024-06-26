import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { projectApi } from "./projectApi";
import { Project } from "./Project";

export default function useProjects() {
  const [page, setPage] = useState(0);
  const queryInfo = useQuery({
    queryKey: ["projects", page],
    queryFn: () => projectApi.get(page + 1),
    placeholderData: keepPreviousData,
  });
  console.log(queryInfo);

  return { ...queryInfo, page, setPage };
}

export function useSaveProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project: Project) => projectApi.put(project),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}