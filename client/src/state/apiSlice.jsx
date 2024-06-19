import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3031/" }),
  tagTypes: ["Experiences", "Jobs"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `authentication`,
        method: "POST",
        body: {
          strategy: "local",
          email: email,
          password,
        },
      }),
    }),
    getAllJobs: builder.query({
      query: ({ hasFilters, filters }) => {
        if (!hasFilters) {
          return `jobs`;
        }

        let queryArray = [];
        if (filters.salaryFrom) {
          queryArray.push(`salaryFrom[$gt]=${filters.salaryFrom}`);
        }
        if (filters.salaryTo) {
          queryArray.push(`salaryTo[$lt]=${filters.salaryTo}`);
        }
        if (filters.type) {
          queryArray.push(`type=${filters.type}`);
        }
        if (filters.homeOffice) {
          queryArray.push(`homeOffice=${filters.homeOffice}`);
        }
        if (filters.city) {
          queryArray.push(`city=${filters.city}`);
        }
        if (filters.company) {
          queryArray.push(`company[$like]=%${filters.company}%`);
        }

        const queryStr = queryArray.join("&");
        return `jobs?${queryStr}`;
      },
      transformResponse: (response) => response.data,
      providesTags: ["Jobs"],
    }),
    getRelatedJob: builder.query({
      query: ({ userId }) => {
        const queryString = `userId=${userId}`;
        return `jobs?${queryString}`;
      },
      transformResponse: (response) => response.data,
      providesTags: ["Jobs"],
    }),
    register: builder.mutation({
      query: ({ email, password, fullname, role }) => ({
        url: `users`,
        method: "POST",
        body: {
          email,
          password,
          fullname,
          role,
        },
      }),
    }),
    submitExperience: builder.mutation({
      query: ({ experience, token }) => ({
        url: `experiences`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: experience,
      }),
    }),
    getExperiences: builder.query({
      query: ({ token }) => ({
        url: `experiences`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Experiences"],
    }),
    modifyExperience: builder.mutation({
      query: ({ experience, id, token }) => ({
        url: `experiences/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: experience,
      }),
      invalidatesTags: ["Experiences"],
    }),
    applyJob: builder.mutation({
      query: ({ jobId, token }) => ({
        url: `applicants`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { jobId },
      }),
    }),
    deleteJob: builder.mutation({
      query: ({ jobId, token }) => ({
        url: `jobs/${jobId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Jobs"],
    }),
    createJob: builder.mutation({
      query: ({ formState, token }) => ({
        url: `jobs`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          company: formState.company,
          position: formState.position,
          description: formState.description,
          salaryFrom: parseInt(formState.salaryFrom),
          salaryTo: parseInt(formState.salaryTo),
          type: formState.type,
          city: formState.city,
          homeOffice: formState.homeOffice,
        },
      }),
      invalidatesTags: ["Jobs"],
    }),
    updateJob: builder.mutation({
      query: ({ id, formState, token }) => ({
        url: `jobs/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formState,
      }),
      invalidatesTags: ["Jobs"],
    }),
    getApplicants: builder.query({
      query: ({ jobId, token }) => ({
        url: `applicants?jobId=${jobId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAllJobsQuery,
  useGetRelatedJobQuery,
  useRegisterMutation,
  useSubmitExperienceMutation,
  useGetExperiencesQuery,
  useModifyExperienceMutation,
  useApplyJobMutation,
  useDeleteJobMutation,
  useCreateJobMutation,
  useUpdateJobMutation,
  useGetApplicantsQuery,
} = apiSlice;
