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
import type { CardDto } from './CardDto';
import {
    CardDtoFromJSON,
    CardDtoFromJSONTyped,
    CardDtoToJSON,
} from './CardDto';

/**
 * 
 * @export
 * @interface UpgradeSubscriptionDto
 */
export interface UpgradeSubscriptionDto {
    /**
     * 
     * @type {string}
     * @memberof UpgradeSubscriptionDto
     */
    cycle?: UpgradeSubscriptionDtoCycleEnum;
    /**
     * 
     * @type {CardDto}
     * @memberof UpgradeSubscriptionDto
     */
    card?: CardDto;
    /**
     * 
     * @type {string}
     * @memberof UpgradeSubscriptionDto
     */
    zip?: string;
}


/**
 * @export
 */
export const UpgradeSubscriptionDtoCycleEnum = {
    No: 'No',
    Daily: 'Daily',
    Monthly: 'Monthly',
    Yearly: 'Yearly'
} as const;
export type UpgradeSubscriptionDtoCycleEnum = typeof UpgradeSubscriptionDtoCycleEnum[keyof typeof UpgradeSubscriptionDtoCycleEnum];


/**
 * Check if a given object implements the UpgradeSubscriptionDto interface.
 */
export function instanceOfUpgradeSubscriptionDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpgradeSubscriptionDtoFromJSON(json: any): UpgradeSubscriptionDto {
    return UpgradeSubscriptionDtoFromJSONTyped(json, false);
}

export function UpgradeSubscriptionDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpgradeSubscriptionDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'cycle': !exists(json, 'cycle') ? undefined : json['cycle'],
        'card': !exists(json, 'card') ? undefined : CardDtoFromJSON(json['card']),
        'zip': !exists(json, 'zip') ? undefined : json['zip'],
    };
}

export function UpgradeSubscriptionDtoToJSON(value?: UpgradeSubscriptionDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'cycle': value.cycle,
        'card': CardDtoToJSON(value.card),
        'zip': value.zip,
    };
}
