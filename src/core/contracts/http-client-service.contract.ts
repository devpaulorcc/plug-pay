export abstract class HttpClientServiceContract {
    public abstract send(options: Options): Promise<Response>;
}

export type Response = {
    body: any;
    status: number;
    headers: Headers;
};

export type Options = {
    method?: Methods;
    url?: string;
    params?: any;
    headers?: Headers;
    body?: any;
    responseType?: ResponseType;
};

export type Methods = 'GET' | 'POST' | 'PUT' | 'OPTIONS' | 'DELETE';

export type Headers = {
    [key: string]: any;
};

export type ResponseType =
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream'
    | 'formdata';
