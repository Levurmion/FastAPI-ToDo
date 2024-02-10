import { ApiPaths, HttpMethods, PathRequestConfig, ValidPathMethods } from "./api-utils.types"
import { IncomingHttpHeaders } from "http"

export type RTKQueryReturnObject = {
    url: string,
    method: HttpMethods,
    body?: any,
    headers?: {
        [header: string]: string
    }
}