import { AccessRights } from '../shared/Model';
export interface Account  {
    username:string
    password:string
}



export interface SessionToken {
    tokenId: string,
    username: string,
    valid: boolean,
    expirationTime: Date,
    accessRights: AccessRights[]
}

export interface TokenGenerator{
    generateToken(account:Account):Promise<SessionToken | undefined>
}

export interface TokenValidator{
    validateToken(tokenID:string):Promise<TokenRights>
}

export interface TokenRights{

    accessRights: AccessRights[];
    state:TokenState
}

export enum TokenState{
    VALID,
    INVALID,
    EXPIRED
}
