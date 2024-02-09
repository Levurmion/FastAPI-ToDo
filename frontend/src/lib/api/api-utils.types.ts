import { paths, components } from "./api-specs.types";

/**
 * Base types to validate path types against
 */
export type HttpMethods = "get" | "post" | "put" | "delete";
export type ApiPaths = keyof paths;

export interface RequestWithBody {
    requestBody: {
        content: {
            [mimeType: string]: any;
        };
    };
}

export type PathParams = { [pathParamName: string]: any };
export type QueryParams = { [queryParamName: string]: any };

export interface ParamsWithPath {
    path: PathParams;
}

export interface ParamsWithQuery {
    query: QueryParams;
}

export interface RequestWithParams {
    parameters: {
        path?: PathParams;
        query?: QueryParams;
    };
}

export interface OperationWithResponses {
    responses: {
        [statusCode: number]: {
            content: {
                "application/json": {
                    [k: string | number]: any;
                };
            };
        };
    };
}

/**
 * Generic Types to configure type suggestions
 */
export type ValidPathMethods<P extends ApiPaths> = keyof paths[P];
export type PathOperation<P extends ApiPaths, M extends ValidPathMethods<P>> = paths[P][M];

export type PathRequestBody<P extends ApiPaths, M extends ValidPathMethods<P>> = PathOperation<
    P,
    M
> extends RequestWithBody
    ? PathOperation<P, M>["requestBody"]["content"]
    : undefined;

export type PathRequestBodyContentTypes<
    P extends ApiPaths,
    M extends ValidPathMethods<P>
> = keyof PathRequestBody<P, M>;

export type PathPathParams<P extends ApiPaths, M extends ValidPathMethods<P>> = PathOperation<
    P,
    M
> extends RequestWithParams
    ? PathOperation<P, M>["parameters"] extends ParamsWithPath
        ? PathOperation<P, M>["parameters"]["path"]
        : undefined
    : undefined;

export type PathQueryParams<P extends ApiPaths, M extends ValidPathMethods<P>> = PathOperation<
    P,
    M
> extends RequestWithParams
    ? PathOperation<P, M>["parameters"] extends ParamsWithQuery
        ? PathOperation<P, M>["parameters"]["query"]
        : undefined
    : undefined;

export type PathRequestConfig<
    P extends ApiPaths,
    M extends ValidPathMethods<P>,
    C extends PathRequestBodyContentTypes<P, M> = PathRequestBodyContentTypes<P, M>
> = {
    requestBody?: {
        contentType?: C;
        data?: PathRequestBody<P, M>[C];
    };
    pathParams?: PathPathParams<P, M>;
    queryParams?: PathQueryParams<P, M>;
};

export type PathResponseStatusCodes<
    P extends ApiPaths,
    M extends ValidPathMethods<P>
> = PathOperation<P, M> extends OperationWithResponses
    ? keyof PathOperation<P, M>["responses"]
    : undefined;

export type PathResponses<
    P extends ApiPaths,
    M extends ValidPathMethods<P>,
    S extends PathResponseStatusCodes<P, M> = PathResponseStatusCodes<P, M>
> = PathOperation<P, M> extends OperationWithResponses
    ? S extends number
        ? PathOperation<P, M>["responses"][S]["content"]["application/json"]
        : undefined
    : undefined;
