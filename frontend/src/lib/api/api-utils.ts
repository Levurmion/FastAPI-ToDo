import axios, { AxiosResponse } from "axios";
import {
    ApiPaths,
    HttpMethods,
    PathPathParams,
    PathRequestConfig,
    PathResponseStatusCodes,
    PathResponses,
    ValidPathMethods,
} from "./api-utils.types";

const clientAxios = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 10000,
    validateStatus: (status) => status < 500,
});

// UTILITY FUNCTIONS
export const replacePathParams = <P extends ApiPaths>(
    path: P,
    pathParams: { [pathParamName: string]: string }
) => {
    return path.replace(/{(.*?)}/g, (match, capture) => pathParams?.[capture] ?? match);
};

export const generateQueryParams = (
    queryParams: { [queryParamName: string]: string } | undefined
) => {
    const queryParamsWithApiKey = {
        ...(queryParams ?? {}),
    };
    return new URLSearchParams(queryParamsWithApiKey).toString();
};


/**
 * Typesafe client-side Posts API fetching utility function.
 * @param path API URL path
 * @param httpMethod HTTP method available for the selected path
 * @param requestConfig request body, path parameters, and query parameters
 * @returns 
 */
export const fetchPostsApi = async <P extends ApiPaths, M extends ValidPathMethods<P>>(
    path: P,
    httpMethod: M,
    requestConfig: PathRequestConfig<P, M>
): Promise<AxiosResponse<PathResponses<P, M>>> => {
    const { requestBody, pathParams, queryParams } = requestConfig;

    const pathUrl = pathParams ? replacePathParams(path, pathParams) : path;

    const response = await clientAxios.request({
        url: pathUrl,
        method: httpMethod as string,
        params: queryParams,
        data: requestBody?.data,
    });

    return response;
};
