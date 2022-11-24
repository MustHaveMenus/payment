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
 * @interface InviteUserDto
 */
export interface InviteUserDto {
    /**
     * 
     * @type {string}
     * @memberof InviteUserDto
     */
    email?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof InviteUserDto
     */
    locations?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof InviteUserDto
     */
    ownerId?: string;
}

/**
 * Check if a given object implements the InviteUserDto interface.
 */
export function instanceOfInviteUserDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function InviteUserDtoFromJSON(json: any): InviteUserDto {
    return InviteUserDtoFromJSONTyped(json, false);
}

export function InviteUserDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): InviteUserDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': !exists(json, 'email') ? undefined : json['email'],
        'locations': !exists(json, 'locations') ? undefined : json['locations'],
        'ownerId': !exists(json, 'ownerId') ? undefined : json['ownerId'],
    };
}

export function InviteUserDtoToJSON(value?: InviteUserDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'locations': value.locations,
        'ownerId': value.ownerId,
    };
}
