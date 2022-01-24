import { IncomingMessage, ServerResponse } from 'http';
import { Account, Handler } from './Model';


export default class LoginHandler implements Handler {

    private req:IncomingMessage;
    private res:ServerResponse;

    constructor(req:IncomingMessage, res:ServerResponse) {
        this.req = req;
        this.res = res;

    }
    public async handleRequest(): Promise<void> {
        console.log('before getting Body');
        const body = await this.getRequestBody();
        console.log('requst  username:'+body.username);
        console.log('requst  password:'+body.password);
    }

    private async getRequestBody(): Promise<Account> {
        return new Promise((resolve, reject) => {
            let body = '';
            this.req.on('data', (data: string) => {
                body += data;
            });
            this.req.on('end', () => {
                try { 
                    resolve(JSON.parse(JSON.stringify(body)))
                } catch (error) {
                    reject(error)
                }
            });
            this.req.on('error', (error: any) => {
                reject(error);
            })
        });
    }
}