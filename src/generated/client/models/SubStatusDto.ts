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
import type { AddOnDto } from './AddOnDto';
import {
    AddOnDtoFromJSON,
    AddOnDtoFromJSONTyped,
    AddOnDtoToJSON,
} from './AddOnDto';

/**
 * 
 * @export
 * @interface SubStatusDto
 */
export interface SubStatusDto {
    /**
     * 
     * @type {string}
     * @memberof SubStatusDto
     */
    plan?: SubStatusDtoPlanEnum;
    /**
     * 
     * @type {string}
     * @memberof SubStatusDto
     */
    status?: SubStatusDtoStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof SubStatusDto
     */
    email?: string;
    /**
     * 
     * @type {number}
     * @memberof SubStatusDto
     */
    grandTotal?: number;
    /**
     * 
     * @type {number}
     * @memberof SubStatusDto
     */
    dueToday?: number;
    /**
     * 
     * @type {boolean}
     * @memberof SubStatusDto
     */
    planUpgradeInProgress?: boolean;
    /**
     * 
     * @type {string}
     * @memberof SubStatusDto
     */
    planCycle?: SubStatusDtoPlanCycleEnum;
    /**
     * 
     * @type {Date}
     * @memberof SubStatusDto
     */
    planEndDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof SubStatusDto
     */
    nextPlanBillingDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof SubStatusDto
     */
    planTotal?: number;
    /**
     * 
     * @type {boolean}
     * @memberof SubStatusDto
     */
    addonsUpgradeInProgress?: boolean;
    /**
     * 
     * @type {string}
     * @memberof SubStatusDto
     */
    addonsCycle?: SubStatusDtoAddonsCycleEnum;
    /**
     * 
     * @type {Date}
     * @memberof SubStatusDto
     */
    addonsEndDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof SubStatusDto
     */
    nextAddonsBillingDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof SubStatusDto
     */
    addonsTotal?: number;
    /**
     * 
     * @type {boolean}
     * @memberof SubStatusDto
     */
    addonsPendingChange?: boolean;
    /**
     * 
     * @type {Array<AddOnDto>}
     * @memberof SubStatusDto
     */
    addons?: Array<AddOnDto>;
}


/**
 * @export
 */
export const SubStatusDtoPlanEnum = {
    Free: 'FREE',
    Premium: 'PREMIUM',
    Enterprise: 'ENTERPRISE'
} as const;
export type SubStatusDtoPlanEnum = typeof SubStatusDtoPlanEnum[keyof typeof SubStatusDtoPlanEnum];

/**
 * @export
 */
export const SubStatusDtoStatusEnum = {
    Active: 'Active',
    Inactive: 'Inactive',
    Paused: 'Paused',
    WillPause: 'WillPause',
    Expired: 'Expired',
    Preview: 'Preview'
} as const;
export type SubStatusDtoStatusEnum = typeof SubStatusDtoStatusEnum[keyof typeof SubStatusDtoStatusEnum];

/**
 * @export
 */
export const SubStatusDtoPlanCycleEnum = {
    No: 'No',
    Daily: 'Daily',
    Monthly: 'Monthly',
    Yearly: 'Yearly'
} as const;
export type SubStatusDtoPlanCycleEnum = typeof SubStatusDtoPlanCycleEnum[keyof typeof SubStatusDtoPlanCycleEnum];

/**
 * @export
 */
export const SubStatusDtoAddonsCycleEnum = {
    No: 'No',
    Daily: 'Daily',
    Monthly: 'Monthly',
    Yearly: 'Yearly'
} as const;
export type SubStatusDtoAddonsCycleEnum = typeof SubStatusDtoAddonsCycleEnum[keyof typeof SubStatusDtoAddonsCycleEnum];


/**
 * Check if a given object implements the SubStatusDto interface.
 */
export function instanceOfSubStatusDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SubStatusDtoFromJSON(json: any): SubStatusDto {
    return SubStatusDtoFromJSONTyped(json, false);
}

export function SubStatusDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubStatusDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'plan': !exists(json, 'plan') ? undefined : json['plan'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'grandTotal': !exists(json, 'grandTotal') ? undefined : json['grandTotal'],
        'dueToday': !exists(json, 'dueToday') ? undefined : json['dueToday'],
        'planUpgradeInProgress': !exists(json, 'planUpgradeInProgress') ? undefined : json['planUpgradeInProgress'],
        'planCycle': !exists(json, 'planCycle') ? undefined : json['planCycle'],
        'planEndDate': !exists(json, 'planEndDate') ? undefined : (new Date(json['planEndDate'])),
        'nextPlanBillingDate': !exists(json, 'nextPlanBillingDate') ? undefined : (new Date(json['nextPlanBillingDate'])),
        'planTotal': !exists(json, 'planTotal') ? undefined : json['planTotal'],
        'addonsUpgradeInProgress': !exists(json, 'addonsUpgradeInProgress') ? undefined : json['addonsUpgradeInProgress'],
        'addonsCycle': !exists(json, 'addonsCycle') ? undefined : json['addonsCycle'],
        'addonsEndDate': !exists(json, 'addonsEndDate') ? undefined : (new Date(json['addonsEndDate'])),
        'nextAddonsBillingDate': !exists(json, 'nextAddonsBillingDate') ? undefined : (new Date(json['nextAddonsBillingDate'])),
        'addonsTotal': !exists(json, 'addonsTotal') ? undefined : json['addonsTotal'],
        'addonsPendingChange': !exists(json, 'addonsPendingChange') ? undefined : json['addonsPendingChange'],
        'addons': !exists(json, 'addons') ? undefined : ((json['addons'] as Array<any>).map(AddOnDtoFromJSON)),
    };
}

export function SubStatusDtoToJSON(value?: SubStatusDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'plan': value.plan,
        'status': value.status,
        'email': value.email,
        'grandTotal': value.grandTotal,
        'dueToday': value.dueToday,
        'planUpgradeInProgress': value.planUpgradeInProgress,
        'planCycle': value.planCycle,
        'planEndDate': value.planEndDate === undefined ? undefined : (value.planEndDate.toISOString()),
        'nextPlanBillingDate': value.nextPlanBillingDate === undefined ? undefined : (value.nextPlanBillingDate.toISOString()),
        'planTotal': value.planTotal,
        'addonsUpgradeInProgress': value.addonsUpgradeInProgress,
        'addonsCycle': value.addonsCycle,
        'addonsEndDate': value.addonsEndDate === undefined ? undefined : (value.addonsEndDate.toISOString()),
        'nextAddonsBillingDate': value.nextAddonsBillingDate === undefined ? undefined : (value.nextAddonsBillingDate.toISOString()),
        'addonsTotal': value.addonsTotal,
        'addonsPendingChange': value.addonsPendingChange,
        'addons': value.addons === undefined ? undefined : ((value.addons as Array<any>).map(AddOnDtoToJSON)),
    };
}

