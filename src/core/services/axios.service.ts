import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
    HttpClientServiceContract,
    Options,
    Response,
} from '../contracts/http-client-service.contract';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { LoggerService } from './logger.service';

@Injectable()
export class AxiosService implements HttpClientServiceContract {
    private readonly loggerService = new LoggerService(AxiosService.name);

    public async send(options: Options): Promise<Response> {
        const requestId = randomUUID();

        try {
            const axiosRequestConfig = this.convertRequestOptions(options);

            this.loggerService.debug(
                `[AxiosService] Axios Request (${requestId}): ${JSON.stringify(axiosRequestConfig)}`,
            );

            const axiosResponse = await axios(axiosRequestConfig);
            const response = this.convertResponse(axiosResponse);

            this.loggerService.debug(
                `[AxiosService] Axios Response (${requestId}): ${JSON.stringify(response)}`,
            );

            return response;
        } catch (error) {
            if (error.response != null) {
                error.response = this.convertResponse(error.response);

                this.loggerService.debug(
                    `[AxiosService] Axios Response (${requestId}): ${JSON.stringify(error.response)}`,
                );
            }

            throw error;
        }
    }

    private convertRequestOptions(requestOptions: Options): AxiosRequestConfig {
        return {
            url: requestOptions.url ?? undefined,
            method: requestOptions.method ?? 'GET',
            data: requestOptions.body ?? undefined,
            params: requestOptions.params ?? undefined,
            headers: requestOptions.headers ?? undefined,
            responseType: requestOptions.responseType ?? undefined,
        };
    }

    private convertResponse(axiosResponse: AxiosResponse): Response {
        return {
            body: axiosResponse.data,
            status: axiosResponse.status,
            headers: axiosResponse.headers,
        };
    }
}
