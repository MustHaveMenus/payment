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
 * @interface PrintProductDto
 */
export interface PrintProductDto {
    /**
     * 
     * @type {number}
     * @memberof PrintProductDto
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof PrintProductDto
     */
    documentId?: string;
    /**
     * 
     * @type {string}
     * @memberof PrintProductDto
     */
    menuId?: string;
    /**
     * 
     * @type {string}
     * @memberof PrintProductDto
     */
    pdfId?: string;
    /**
     * 
     * @type {boolean}
     * @memberof PrintProductDto
     */
    nextGen?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PrintProductDto
     */
    pdfUploaded?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PrintProductDto
     */
    available?: boolean;
}

/**
 * Check if a given object implements the PrintProductDto interface.
 */
export function instanceOfPrintProductDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PrintProductDtoFromJSON(json: any): PrintProductDto {
    return PrintProductDtoFromJSONTyped(json, false);
}

export function PrintProductDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PrintProductDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'documentId': !exists(json, 'documentId') ? undefined : json['documentId'],
        'menuId': !exists(json, 'menuId') ? undefined : json['menuId'],
        'pdfId': !exists(json, 'pdfId') ? undefined : json['pdfId'],
        'nextGen': !exists(json, 'nextGen') ? undefined : json['nextGen'],
        'pdfUploaded': !exists(json, 'pdfUploaded') ? undefined : json['pdfUploaded'],
        'available': !exists(json, 'available') ? undefined : json['available'],
    };
}

export function PrintProductDtoToJSON(value?: PrintProductDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'documentId': value.documentId,
        'menuId': value.menuId,
        'pdfId': value.pdfId,
        'nextGen': value.nextGen,
        'pdfUploaded': value.pdfUploaded,
        'available': value.available,
    };
}
