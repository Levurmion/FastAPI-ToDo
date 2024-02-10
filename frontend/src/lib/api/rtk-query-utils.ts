import { generateQueryParams, replacePathParams } from "./api-utils";
import { ApiPaths, ValidPathMethods, PathRequestConfig, HttpMethods } from "./api-utils.types"
import { RTKQueryReturnObject } from "./rtk-query-utils.types";


/**
 * Typesafe RTK-Query builder for Posts API
 * @param path API URL path
 * @param httpMethod HTTP method available for the selected path
 * @returns 
 */
export const queryBuilder = <P extends ApiPaths, M extends ValidPathMethods<P>>(
    path: P,
    httpMethod: M
) => {

    /**
     * @param requestConfig path params, query params, and request body for the request
     * @returns 
     */
    const rtkQueryFunction = (requestConfig: PathRequestConfig<P, M>): RTKQueryReturnObject => {
        const { requestBody, pathParams, queryParams } = requestConfig
        const pathUrl = pathParams !== undefined ? replacePathParams(path, pathParams) : path
        const queryStr = queryParams !== undefined ? generateQueryParams(queryParams) : ""
        const url = pathUrl + "?" + queryStr

        return {
            url,
            method: httpMethod as HttpMethods,
            body: requestBody?.data,
            headers: {
                'content-type': requestBody?.contentType as string
            }
        }
    }

    return rtkQueryFunction
};
