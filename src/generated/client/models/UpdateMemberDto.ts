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
 * @interface UpdateMemberDto
 */
export interface UpdateMemberDto {
    /**
     * 
     * @type {string}
     * @memberof UpdateMemberDto
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateMemberDto
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateMemberDto
     */
    password?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateMemberDto
     */
    currentPassword?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateMemberDto
     */
    hasToastInterest?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateMemberDto
     */
    hasCsCallInterest?: boolean;
}

/**
 * Check if a given object implements the UpdateMemberDto interface.
 */
export function instanceOfUpdateMemberDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateMemberDtoFromJSON(json: any): UpdateMemberDto {
    return UpdateMemberDtoFromJSONTyped(json, false);
}

export function UpdateMemberDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateMemberDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'password': !exists(json, 'password') ? undefined : json['password'],
        'currentPassword': !exists(json, 'currentPassword') ? undefined : json['currentPassword'],
        'hasToastInterest': !exists(json, 'hasToastInterest') ? undefined : json['hasToastInterest'],
        'hasCsCallInterest': !exists(json, 'hasCsCallInterest') ? undefined : json['hasCsCallInterest'],
    };
}

export function UpdateMemberDtoToJSON(value?: UpdateMemberDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'email': value.email,
        'password': value.password,
        'currentPassword': value.currentPassword,
        'hasToastInterest': value.hasToastInterest,
        'hasCsCallInterest': value.hasCsCallInterest,
    };
}

