import { AccessRights } from '../shared/Model';
export interface Account  {
    username:string
    password:string
}

export interface Handler {
    handleRequest():void
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

