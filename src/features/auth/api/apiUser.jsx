import { api } from "../../../shared/api/api";
import { createApiConfig } from "../../../shared/api/createApiConfig";

export const apiUser = api.injectEndpoints({
    endpoints: (build) => ({
        sighin: build.mutation({
            query: (credentials) => createApiConfig("POST", "/login", credentials)
        })
    })
})

export const {useSighinMutation} = apiUser;
