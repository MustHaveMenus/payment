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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface AddonExpirationDto
 */
export interface AddonExpirationDto {
    /**
     * 
     * @type {Date}
     * @memberof AddonExpirationDto
     */
    date?: Date;
}

/**
 * Check if a given object implements the AddonExpirationDto interface.
 */
export function instanceOfAddonExpirationDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AddonExpirationDtoFromJSON(json: any): AddonExpirationDto {
    return AddonExpirationDtoFromJSONTyped(json, false);
}

export function AddonExpirationDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AddonExpirationDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'date': !exists(json, 'date') ? undefined : (new Date(json['date'])),
    };
}

export function AddonExpirationDtoToJSON(value?: AddonExpirationDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'date': value.date === undefined ? undefined : (value.date.toISOString()),
    };
}

