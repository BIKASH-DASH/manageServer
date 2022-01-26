import { IncomingMessage, ServerResponse } from 'http';
import { Handler } from "./Model";
import { UsersDbAccess } from '../User/UsersDbAccess';
import { HTTP_CODES, HTTP_METHODS } from '../shared/Model';
import Utils from './Utils';

export class UserHandler implements Handler  {
    private req: IncomingMessage;
    private res: ServerResponse;
    private usersDbAccess:UsersDbAccess = new UsersDbAccess();

    constructor(req:IncomingMessage,res:ServerResponse){
        this.req = req;
        this.res = res;
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
        console.log('queryId:'+parsedUrl?.query.id);
        
        const a = 5
    }

    private async handleNotFound(){
        this.res.statusCode = HTTP_CODES.NOT_FOUND;
        this.res.write('Not Found')
    }

}