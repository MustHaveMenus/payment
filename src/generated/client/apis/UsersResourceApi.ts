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


import * as runtime from '../runtime';
import type {
  InviteUserDto,
  MemberDto,
  RegisterDto,
} from '../models';
import {
    InviteUserDtoFromJSON,
    InviteUserDtoToJSON,
    MemberDtoFromJSON,
    MemberDtoToJSON,
    RegisterDtoFromJSON,
    RegisterDtoToJSON,
} from '../models';

export interface GetUserInviteRequest {
    id: string;
}

export interface InviteUserRequest {
    inviteUserDto: Array<InviteUserDto>;
}

export interface RegisterRequest {
    registerDto: RegisterDto;
}

export interface RemoveUserRequest {
    memberId: string;
}

export interface RevokeInvitationRequest {
    memberId: string;
}

export interface SendInvitationEmailRequest {
    memberId: string;
}

export interface ValidateTeamUsersRequest {
    inviteUserDto: Array<InviteUserDto>;
}

/**
 * 
 */
export class UsersResourceApi extends runtime.BaseAPI {

    /**
     */
    async getUserInviteRaw(requestParameters: GetUserInviteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MemberDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getUserInvite.');
        }

        const queryParameters: any = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/public/users/invite`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MemberDtoFromJSON(jsonValue));
    }

    /**
     */
    async getUserInvite(requestParameters: GetUserInviteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MemberDto> {
        const response = await this.getUserInviteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async inviteUserRaw(requestParameters: InviteUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.inviteUserDto === null || requestParameters.inviteUserDto === undefined) {
            throw new runtime.RequiredError('inviteUserDto','Required parameter requestParameters.inviteUserDto was null or undefined when calling inviteUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/users/invite`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.inviteUserDto.map(InviteUserDtoToJSON),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async inviteUser(requestParameters: InviteUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.inviteUserRaw(requestParameters, initOverrides);
    }

    /**
     */
    async registerRaw(requestParameters: RegisterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.registerDto === null || requestParameters.registerDto === undefined) {
            throw new runtime.RequiredError('registerDto','Required parameter requestParameters.registerDto was null or undefined when calling register.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/public/users/register`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RegisterDtoToJSON(requestParameters.registerDto),
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async register(requestParameters: RegisterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.registerRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async removeUserRaw(requestParameters: RemoveUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.memberId === null || requestParameters.memberId === undefined) {
            throw new runtime.RequiredError('memberId','Required parameter requestParameters.memberId was null or undefined when calling removeUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/users/{memberId}`.replace(`{${"memberId"}}`, encodeURIComponent(String(requestParameters.memberId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async removeUser(requestParameters: RemoveUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.removeUserRaw(requestParameters, initOverrides);
    }

    /**
     */
    async revokeInvitationRaw(requestParameters: RevokeInvitationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.memberId === null || requestParameters.memberId === undefined) {
            throw new runtime.RequiredError('memberId','Required parameter requestParameters.memberId was null or undefined when calling revokeInvitation.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/users/invites/{memberId}`.replace(`{${"memberId"}}`, encodeURIComponent(String(requestParameters.memberId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async revokeInvitation(requestParameters: RevokeInvitationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.revokeInvitationRaw(requestParameters, initOverrides);
    }

    /**
     */
    async sendInvitationEmailRaw(requestParameters: SendInvitationEmailRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.memberId === null || requestParameters.memberId === undefined) {
            throw new runtime.RequiredError('memberId','Required parameter requestParameters.memberId was null or undefined when calling sendInvitationEmail.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/users/invites/{memberId}/resend`.replace(`{${"memberId"}}`, encodeURIComponent(String(requestParameters.memberId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async sendInvitationEmail(requestParameters: SendInvitationEmailRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.sendInvitationEmailRaw(requestParameters, initOverrides);
    }

    /**
     */
    async validateTeamUsersRaw(requestParameters: ValidateTeamUsersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.inviteUserDto === null || requestParameters.inviteUserDto === undefined) {
            throw new runtime.RequiredError('inviteUserDto','Required parameter requestParameters.inviteUserDto was null or undefined when calling validateTeamUsers.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/users/invite/validate`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.inviteUserDto.map(InviteUserDtoToJSON),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async validateTeamUsers(requestParameters: ValidateTeamUsersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.validateTeamUsersRaw(requestParameters, initOverrides);
    }

}
