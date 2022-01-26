import { IncomingMessage, ServerResponse } from 'http';
import { UsersDbAccess } from '../User/UsersDbAccess';
import { HTTP_METHODS, HTTP_CODES } from '../shared/Model';
import Utils from './Utils';
import { BaseRequestHandler } from './BaseRequestHandler';

export class UserHandler extends BaseRequestHandler  {
    private usersDbAccess:UsersDbAccess = new UsersDbAccess();

    constructor(req:IncomingMessage,res:ServerResponse){
        super(req,res);
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




}