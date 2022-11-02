import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const kanbanApi = createApi({
  reducerPath: 'kanbanApi',
  prepareHeaders: (headers) => {
    headers.set('Access-Control-Allow-Origin', '*');
    return headers;
  },
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  refetchOnFocus: true,
  tagTypes: ['Task', 'Subtask'],
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
      invalidatesTags: ['Subtask'],
    }),
    postSubtask: builder.mutation({
      query: (body) => ({
        url: `subtasks`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `tasks/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Task'],
    }),
    postTask: builder.mutation({
      query: (body) => ({
        url: `tasks`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetAllBoardsQuery,
  useGetAllListsOfOneBoardQuery,
  useGetOneBoardQuery,
  useGetOneTaskQuery,
  useUpdateSubtaskMutation,
  usePostSubtaskMutation,
  useUpdateTaskMutation,
  usePostTaskMutation,
  useDeleteTaskMutation,
} = kanbanApi;
