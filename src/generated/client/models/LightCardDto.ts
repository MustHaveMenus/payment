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
 * @interface LightCardDto
 */
export interface LightCardDto {
    /**
     * 
     * @type {string}
     * @memberof LightCardDto
     */
    ending?: string;
    /**
     * 
     * @type {number}
     * @memberof LightCardDto
     */
    exprMonth?: number;
    /**
     * 
     * @type {number}
     * @memberof LightCardDto
     */
    exprYear?: number;
}

/**
 * Check if a given object implements the LightCardDto interface.
 */
export function instanceOfLightCardDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LightCardDtoFromJSON(json: any): LightCardDto {
    return LightCardDtoFromJSONTyped(json, false);
}

export function LightCardDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): LightCardDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'ending': !exists(json, 'ending') ? undefined : json['ending'],
        'exprMonth': !exists(json, 'exprMonth') ? undefined : json['exprMonth'],
        'exprYear': !exists(json, 'exprYear') ? undefined : json['exprYear'],
    };
}

export function LightCardDtoToJSON(value?: LightCardDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ending': value.ending,
        'exprMonth': value.exprMonth,
        'exprYear': value.exprYear,
    };
}

