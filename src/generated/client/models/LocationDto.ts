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
import type { BrandLogoDto } from './BrandLogoDto';
import {
    BrandLogoDtoFromJSON,
    BrandLogoDtoFromJSONTyped,
    BrandLogoDtoToJSON,
} from './BrandLogoDto';
import type { BrandUploadedFontDto } from './BrandUploadedFontDto';
import {
    BrandUploadedFontDtoFromJSON,
    BrandUploadedFontDtoFromJSONTyped,
    BrandUploadedFontDtoToJSON,
} from './BrandUploadedFontDto';
import type { MemberDto } from './MemberDto';
import {
    MemberDtoFromJSON,
    MemberDtoFromJSONTyped,
    MemberDtoToJSON,
} from './MemberDto';

/**
 * 
 * @export
 * @interface LocationDto
 */
export interface LocationDto {
    /**
     * 
     * @type {string}
     * @memberof LocationDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof LocationDto
     */
    internalId?: number;
    /**
     * 
     * @type {string}
     * @memberof LocationDto
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof LocationDto
     */
    website?: string;
    /**
     * 
     * @type {string}
     * @memberof LocationDto
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof LocationDto
     */
    twitter?: string;
    /**
     * 
     * @type {string}
     * @memberof LocationDto
     */
    instagram?: string;
    /**
     * 
     * @type {string}
     * @memberof LocationDto
     */
    facebook?: string;
    /**
     * 
     * @type {number}
     * @memberof LocationDto
     */
    restaurantId?: number;
    /**
     * 
     * @type {string}
     * @memberof LocationDto
     */
    address?: string;
    /**
     * 
     * @type {string}
     * @memberof LocationDto
     */
    address2?: string;
    /**
     * 
     * @type {string}
     * @memberof LocationDto
     */
    city?: string;
    /**
     * 
     * @type {string}
     * @memberof LocationDto
     */
    state?: string;
    /**
     * 
     * @type {string}
     * @memberof LocationDto
     */
    phone?: string;
    /**
     * 
     * @type {string}
     * @memberof LocationDto
     */
    zip?: string;
    /**
     * 
     * @type {string}
     * @memberof LocationDto
     */
    country?: string;
    /**
     * 
     * @type {string}
     * @memberof LocationDto
     */
    brandId?: string;
    /**
     * 
     * @type {Array<BrandLogoDto>}
     * @memberof LocationDto
     */
    brandLogos?: Array<BrandLogoDto>;
    /**
     * 
     * @type {Array<BrandUploadedFontDto>}
     * @memberof LocationDto
     */
    brandUploadedFonts?: Array<BrandUploadedFontDto>;
    /**
     * 
     * @type {string}
     * @memberof LocationDto
     */
    type?: LocationDtoTypeEnum;
    /**
     * 
     * @type {Array<MemberDto>}
     * @memberof LocationDto
     */
    managers?: Array<MemberDto>;
    /**
     * 
     * @type {boolean}
     * @memberof LocationDto
     */
    removed?: boolean;
    /**
     * 
     * @type {number}
     * @memberof LocationDto
     */
    designCount?: number;
    /**
     * 
     * @type {number}
     * @memberof LocationDto
     */
    qrCount?: number;
    /**
     * 
     * @type {number}
     * @memberof LocationDto
     */
    lpCount?: number;
    /**
     * 
     * @type {number}
     * @memberof LocationDto
     */
    omCount?: number;
    /**
     * 
     * @type {Date}
     * @memberof LocationDto
     */
    createdDate?: Date;
    /**
     * 
     * @type {boolean}
     * @memberof LocationDto
     */
    primary?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof LocationDto
     */
    disabled?: boolean;
}


/**
 * @export
 */
export const LocationDtoTypeEnum = {
    Restaurant: 'Restaurant',
    Spa: 'Spa',
    Dispensary: 'Dispensary',
    Designer: 'Designer',
    Other: 'Other'
} as const;
export type LocationDtoTypeEnum = typeof LocationDtoTypeEnum[keyof typeof LocationDtoTypeEnum];


/**
 * Check if a given object implements the LocationDto interface.
 */
export function instanceOfLocationDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LocationDtoFromJSON(json: any): LocationDto {
    return LocationDtoFromJSONTyped(json, false);
}

export function LocationDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): LocationDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'internalId': !exists(json, 'internalId') ? undefined : json['internalId'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'website': !exists(json, 'website') ? undefined : json['website'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'twitter': !exists(json, 'twitter') ? undefined : json['twitter'],
        'instagram': !exists(json, 'instagram') ? undefined : json['instagram'],
        'facebook': !exists(json, 'facebook') ? undefined : json['facebook'],
        'restaurantId': !exists(json, 'restaurantId') ? undefined : json['restaurantId'],
        'address': !exists(json, 'address') ? undefined : json['address'],
        'address2': !exists(json, 'address2') ? undefined : json['address2'],
        'city': !exists(json, 'city') ? undefined : json['city'],
        'state': !exists(json, 'state') ? undefined : json['state'],
        'phone': !exists(json, 'phone') ? undefined : json['phone'],
        'zip': !exists(json, 'zip') ? undefined : json['zip'],
        'country': !exists(json, 'country') ? undefined : json['country'],
        'brandId': !exists(json, 'brandId') ? undefined : json['brandId'],
        'brandLogos': !exists(json, 'brandLogos') ? undefined : ((json['brandLogos'] as Array<any>).map(BrandLogoDtoFromJSON)),
        'brandUploadedFonts': !exists(json, 'brandUploadedFonts') ? undefined : ((json['brandUploadedFonts'] as Array<any>).map(BrandUploadedFontDtoFromJSON)),
        'type': !exists(json, 'type') ? undefined : json['type'],
        'managers': !exists(json, 'managers') ? undefined : ((json['managers'] as Array<any>).map(MemberDtoFromJSON)),
        'removed': !exists(json, 'removed') ? undefined : json['removed'],
        'designCount': !exists(json, 'designCount') ? undefined : json['designCount'],
        'qrCount': !exists(json, 'qrCount') ? undefined : json['qrCount'],
        'lpCount': !exists(json, 'lpCount') ? undefined : json['lpCount'],
        'omCount': !exists(json, 'omCount') ? undefined : json['omCount'],
        'createdDate': !exists(json, 'createdDate') ? undefined : (new Date(json['createdDate'])),
        'primary': !exists(json, 'primary') ? undefined : json['primary'],
        'disabled': !exists(json, 'disabled') ? undefined : json['disabled'],
    };
}

export function LocationDtoToJSON(value?: LocationDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'internalId': value.internalId,
        'name': value.name,
        'website': value.website,
        'email': value.email,
        'twitter': value.twitter,
        'instagram': value.instagram,
        'facebook': value.facebook,
        'restaurantId': value.restaurantId,
        'address': value.address,
        'address2': value.address2,
        'city': value.city,
        'state': value.state,
        'phone': value.phone,
        'zip': value.zip,
        'country': value.country,
        'brandId': value.brandId,
        'brandLogos': value.brandLogos === undefined ? undefined : ((value.brandLogos as Array<any>).map(BrandLogoDtoToJSON)),
        'brandUploadedFonts': value.brandUploadedFonts === undefined ? undefined : ((value.brandUploadedFonts as Array<any>).map(BrandUploadedFontDtoToJSON)),
        'type': value.type,
        'managers': value.managers === undefined ? undefined : ((value.managers as Array<any>).map(MemberDtoToJSON)),
        'removed': value.removed,
        'designCount': value.designCount,
        'qrCount': value.qrCount,
        'lpCount': value.lpCount,
        'omCount': value.omCount,
        'createdDate': value.createdDate === undefined ? undefined : (value.createdDate.toISOString()),
        'primary': value.primary,
        'disabled': value.disabled,
    };
}
