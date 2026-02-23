import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApiConfig } from "./createApiConfig";

const config = {
    develop: import.meta.env.VITE_API_URL
};

export const apiURL = config.develop;

const FORM = 'Form';

export const api = createApi({
    reducerPath: 'apiForm',
    baseQuery: fetchBaseQuery({
        baseUrl: apiURL,
    }),
    endpoints: (build) => ({
        getForm: build.query({
            query: () => '/',
            providesTags: [FORM]
        }),

        saveForm: build.mutation({
            query: (form) => createApiConfig('POST', '/saveForm', form),
            invalidatesTags: [FORM]
        }),

        updateForm: build.mutation({
            query: (form) => createApiConfig('PUT', `/updateForm/${form.id}`, form),
            invalidatesTags: [FORM]
        }),

        confirmForm: build.mutation({
            query: (id) => createApiConfig('PUT',`/confirmForm/${id}`),
            invalidatesTags: [FORM]
        }),

        deleteForm: build.mutation({
            query: (id) => createApiConfig('DELETE', `/deleteForm/${id}`),
            invalidatesTags: [FORM]
        })
    })
});

export const {
    useGetFormQuery,
    useSaveFormMutation,
    useUpdateFormMutation,
    useConfirmFormMutation,
    useDeleteFormMutation
} = api;


