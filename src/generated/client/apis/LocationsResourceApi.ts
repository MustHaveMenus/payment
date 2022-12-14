/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  LocationDto,
  TransferFilesDto,
} from '../models';
import {
    LocationDtoFromJSON,
    LocationDtoToJSON,
    TransferFilesDtoFromJSON,
    TransferFilesDtoToJSON,
} from '../models';

export interface DeleteLocationRequest {
    id: number;
}

export interface GetLocationRequest {
    id?: string;
    internalId?: number;
}

export interface TransferDigitalProductsRequest {
    transferFilesDto: TransferFilesDto;
}

export interface UpdateLocationRequest {
    locationDto: LocationDto;
}

/**
 * 
 */
export class LocationsResourceApi extends runtime.BaseAPI {

    /**
     */
    async deleteLocationRaw(requestParameters: DeleteLocationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteLocation.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/locations/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async deleteLocation(requestParameters: DeleteLocationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteLocationRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getLocationRaw(requestParameters: GetLocationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LocationDto>> {
        const queryParameters: any = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        if (requestParameters.internalId !== undefined) {
            queryParameters['internalId'] = requestParameters.internalId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/locations`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LocationDtoFromJSON(jsonValue));
    }

    /**
     */
    async getLocation(requestParameters: GetLocationRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LocationDto> {
        const response = await this.getLocationRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async transferDigitalProductsRaw(requestParameters: TransferDigitalProductsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.transferFilesDto === null || requestParameters.transferFilesDto === undefined) {
            throw new runtime.RequiredError('transferFilesDto','Required parameter requestParameters.transferFilesDto was null or undefined when calling transferDigitalProducts.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/locations/transfer`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: TransferFilesDtoToJSON(requestParameters.transferFilesDto),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async transferDigitalProducts(requestParameters: TransferDigitalProductsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.transferDigitalProductsRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updateLocationRaw(requestParameters: UpdateLocationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.locationDto === null || requestParameters.locationDto === undefined) {
            throw new runtime.RequiredError('locationDto','Required parameter requestParameters.locationDto was null or undefined when calling updateLocation.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/locations`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: LocationDtoToJSON(requestParameters.locationDto),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async updateLocation(requestParameters: UpdateLocationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.updateLocationRaw(requestParameters, initOverrides);
    }

}
