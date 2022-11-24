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
 * @interface CardDto
 */
export interface CardDto {
    /**
     * 
     * @type {string}
     * @memberof CardDto
     */
    number?: string;
    /**
     * 
     * @type {string}
     * @memberof CardDto
     */
    cvv?: string;
    /**
     * 
     * @type {string}
     * @memberof CardDto
     */
    year?: string;
    /**
     * 
     * @type {string}
     * @memberof CardDto
     */
    month?: string;
    /**
     * 
     * @type {boolean}
     * @memberof CardDto
     */
    valid?: boolean;
}

/**
 * Check if a given object implements the CardDto interface.
 */
export function instanceOfCardDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CardDtoFromJSON(json: any): CardDto {
    return CardDtoFromJSONTyped(json, false);
}

export function CardDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CardDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'number': !exists(json, 'number') ? undefined : json['number'],
        'cvv': !exists(json, 'cvv') ? undefined : json['cvv'],
        'year': !exists(json, 'year') ? undefined : json['year'],
        'month': !exists(json, 'month') ? undefined : json['month'],
        'valid': !exists(json, 'valid') ? undefined : json['valid'],
    };
}

export function CardDtoToJSON(value?: CardDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'number': value.number,
        'cvv': value.cvv,
        'year': value.year,
        'month': value.month,
        'valid': value.valid,
    };
}
