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
 * @interface InitDto
 */
export interface InitDto {
    /**
     * 
     * @type {string}
     * @memberof InitDto
     */
    id?: string;
    /**
     * 
     * @type {boolean}
     * @memberof InitDto
     */
    owner?: boolean;
    /**
     * 
     * @type {number}
     * @memberof InitDto
     */
    internalId?: number;
    /**
     * 
     * @type {string}
     * @memberof InitDto
     */
    teamId?: string;
    /**
     * 
     * @type {boolean}
     * @memberof InitDto
     */
    logged?: boolean;
    /**
     * 
     * @type {string}
     * @memberof InitDto
     */
    plan?: InitDtoPlanEnum;
    /**
     * 
     * @type {string}
     * @memberof InitDto
     */
    memberStatus?: InitDtoMemberStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof InitDto
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof InitDto
     */
    name?: string;
}


/**
 * @export
 */
export const InitDtoPlanEnum = {
    Free: 'FREE',
    Premium: 'PREMIUM',
    Enterprise: 'ENTERPRISE'
} as const;
export type InitDtoPlanEnum = typeof InitDtoPlanEnum[keyof typeof InitDtoPlanEnum];

/**
 * @export
 */
export const InitDtoMemberStatusEnum = {
    Active: 'Active',
    Hold: 'Hold',
    Cancelled: 'Cancelled',
    Declined: 'Declined',
    Freemium: 'Freemium',
    Paused: 'Paused',
    PastDue: 'PastDue'
} as const;
export type InitDtoMemberStatusEnum = typeof InitDtoMemberStatusEnum[keyof typeof InitDtoMemberStatusEnum];


/**
 * Check if a given object implements the InitDto interface.
 */
export function instanceOfInitDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function InitDtoFromJSON(json: any): InitDto {
    return InitDtoFromJSONTyped(json, false);
}

export function InitDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): InitDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'owner': !exists(json, 'owner') ? undefined : json['owner'],
        'internalId': !exists(json, 'internalId') ? undefined : json['internalId'],
        'teamId': !exists(json, 'teamId') ? undefined : json['teamId'],
        'logged': !exists(json, 'logged') ? undefined : json['logged'],
        'plan': !exists(json, 'plan') ? undefined : json['plan'],
        'memberStatus': !exists(json, 'memberStatus') ? undefined : json['memberStatus'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'name': !exists(json, 'name') ? undefined : json['name'],
    };
}

export function InitDtoToJSON(value?: InitDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'owner': value.owner,
        'internalId': value.internalId,
        'teamId': value.teamId,
        'logged': value.logged,
        'plan': value.plan,
        'memberStatus': value.memberStatus,
        'email': value.email,
        'name': value.name,
    };
}
