import { IncomingMessage, ServerResponse } from 'http';

export default class LoginHandler {

    private req:IncomingMessage;
    private res:ServerResponse;

    constructor(req:IncomingMessage, res:ServerResponse) {
        this.req = req;
        this.res = res;

    }

    public   handleRequest () : void{
        console.log('login55555');
        
    } 
}