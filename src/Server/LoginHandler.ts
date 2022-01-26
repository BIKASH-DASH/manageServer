import { IncomingMessage, ServerResponse, createServer } from 'http';
import { Account,  TokenGenerator, SessionToken } from './Model';
import { HTTP_CODES, HTTP_METHODS } from '../shared/Model';
import { BaseRequestHandler } from './BaseRequestHandler';


export default class LoginHandler extends BaseRequestHandler {

    private tokenGenerator: TokenGenerator;

    constructor(req: IncomingMessage, res: ServerResponse, tokenGenerator: TokenGenerator) {
        super(req,res)
        this.tokenGenerator = tokenGenerator;

    }
    public async handleRequest(): Promise<void> {

        switch (this.req.method) {
            case HTTP_METHODS.POST:
                await this.handlePost();
                break;

            default:
                await this.handleNotFound()
                break;
        }






    }


    private async handlePost() {

        try {

            const body:Account = await this.getRequestBody();
            const SessionToken = await this.tokenGenerator.generateToken(body);

            if (SessionToken) {
                this.res.statusCode = HTTP_CODES.CREATED;
                this.res.writeHead(HTTP_CODES.CREATED, {
                    'Content-Type': 'application/json'
                })
                this.res.write(JSON.stringify(SessionToken))
            } else {
                this.res.statusCode = HTTP_CODES.NOT_FOUND;
                this.res.write('wrong credentials')
            }

        } catch (error) {
            this.res.write('error:' + error)
        }

    }

}