import { IncomingMessage, ServerResponse, createServer } from 'http';
import { Account, Handler, TokenGenerator, SessionToken } from './Model';
import { HTTP_CODES } from '../shared/Model';


export default class LoginHandler implements Handler {

    private req:IncomingMessage;
    private res:ServerResponse;
    private tokenGenerator:TokenGenerator;

    constructor(req:IncomingMessage, res:ServerResponse,tokenGenerator:TokenGenerator) {
        this.req = req;
        this.res = res;
        this.tokenGenerator = tokenGenerator;

    }
    public async handleRequest(): Promise<void> {

        try {
            
            const body = await this.getRequestBody();
            const SessionToken = await this.tokenGenerator.generateToken(body);
        
            if(SessionToken){
                this.res.statusCode = HTTP_CODES.CREATED ;
                this.res.writeHead(HTTP_CODES.CREATED,{
                    'Content-Type':'application/json'
                })
                this.res.write(JSON.stringify(SessionToken))
            }else{
                this.res.statusCode = HTTP_CODES.NOT_FOUND ;
                this.res.write('wrong credentials')
            }

        } catch (error) {
            this.res.write('error:'+error)
        }

       
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