import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const kanbanApi = createApi({
  reducerPath: 'kanbanApi',
  prepareHeaders: (headers) => {
    headers.set('Access-Control-Allow-Origin', '*');
    console.log(headers);
    return headers;
  },
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  credentials: 'include',

  endpoints: (builder) => ({
    getAllBoards: builder.query({
      query: () => 'boards',
    }),
    getOneBoard: builder.query({
      query: (selectedBoardId) => `boards/${selectedBoardId}`,
    }),
    getAllListsOfOneBoard: builder.query({
      query: (selectedBoardId) => `boards/${selectedBoardId}/lists`,
    }),
    getOneTask: builder.query({
      query: (selectedTaskId) => `tasks/${selectedTaskId}`,
    }),
    updateSubtask: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `subtasks/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      // invalidatesTags: ["User", "Project"],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `tasks/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      // invalidatesTags: ["User", "Project"],
    }),
    postTask: builder.mutation({
      query: ({ id, techno }) => ({
        url: `user/${id}/techno`,
        method: 'POST',
        body: { techno },
      }),
      invalidatesTags: ['User'],
    }),
    deleteTask: builder.mutation({
      query: ({ taskId, ...body }) => ({
        url: `/tasks/${taskId}`,
        method: 'DELETE',
        body: body,
      }),
      // invalidatesTags: ["User", "Project"],
    }),
  }),
});

export const {
  useGetAllBoardsQuery,
  useGetAllListsOfOneBoardQuery,
  useGetOneBoardQuery,
  useGetOneTaskQuery,
  useUpdateSubtaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = kanbanApi;
