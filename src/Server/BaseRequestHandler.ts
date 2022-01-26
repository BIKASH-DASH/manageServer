import { IncomingMessage, ServerResponse } from 'http';
import { HTTP_CODES } from '../shared/Model';

export abstract class BaseRequestHandler {

    protected req: IncomingMessage;
    protected res: ServerResponse;

    constructor(req:IncomingMessage,res:ServerResponse){
        this.req = req;
        this.res = res;
    }

    abstract   handleRequest() :Promise<void>;

    protected  handleNotFound() {
        this.res.statusCode = HTTP_CODES.NOT_FOUND;
        this.res.write('Not Found')
    }

    protected async getRequestBody(): Promise<any> {
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

    protected  responseJsonObject (code:HTTP_CODES,object:any){
        this.res.writeHead(code,{'content-type':'application/json'});
        this.res.write(JSON.stringify(object));
    }


    protected async  responseBedRequest(message:string){
        this.res.writeHead(HTTP_CODES.BAD_REQUEST);
        this.res.write(message)
    }

}