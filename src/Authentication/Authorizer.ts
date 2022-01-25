import { json } from 'stream/consumers';
import { TokenGenerator, Account, SessionToken } from '../Server/Model';



export class Authorizer implements TokenGenerator {



    async generateToken(account: Account): Promise<SessionToken  | undefined> {
       
     const acc = JSON.stringify(account);
     const obj = JSON.parse(JSON.parse(acc));
     
     
        
        
        if (obj.username === "abcd" &&
            obj.password === "1234") {
                
            return {
                tokenId: 'someTokenId'
            }
        } else {
            return undefined;
        }
    }

} 