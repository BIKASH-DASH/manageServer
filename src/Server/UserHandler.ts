import { IncomingMessage, ServerResponse } from 'http';
import { UsersDbAccess } from '../User/UsersDbAccess';
import { HTTP_METHODS, HTTP_CODES, AccessRights } from '../shared/Model';
import Utils from './Utils';
import { BaseRequestHandler } from './BaseRequestHandler';
import { TokenValidator } from './Model';

export class UserHandler extends BaseRequestHandler  {
    private usersDbAccess:UsersDbAccess = new UsersDbAccess();
    private tokenValidator : TokenValidator;

    constructor(req:IncomingMessage,res:ServerResponse,tokenValidator:TokenValidator){
        super(req,res);
        this.tokenValidator = tokenValidator;
    }


    public async handleRequest(): Promise<void> {
        switch (this.req.method) {
            case HTTP_METHODS.GET:
                await this.handleGet();
                break;

            default:
                await this.handleNotFound()
                break;
        }
    }
    private async handleGet() {
        const parsedUrl = Utils.getUrlParameters(this.req.url);
        if(parsedUrl){
            const userID = parsedUrl?.query.id;
            if(userID){
            const User   = await this.usersDbAccess.getUserByID(userID as string);
            if(User){
                this.responseJsonObject(HTTP_CODES.OK,User)
            }else{
                this.handleNotFound();
            }
        }else{
                this.responseBedRequest('userId not valid ')
        }

        }
    }

    public async operationAuthorized(operation:AccessRights) :Promise <boolean>{
       const tokenID = this.req.headers.authorization;
       if(tokenID){
           const tokenRights = await this.tokenValidator.validateToken(tokenID);
           if(tokenRights.accessRights.includes(operation)){
               return true;
           }else{
               return false;
           }
       }else{
        return false;
       }

    }




}