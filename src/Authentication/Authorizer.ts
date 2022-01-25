import { json } from 'stream/consumers';
import { TokenGenerator, Account, SessionToken } from '../Server/Model';
import { UserCredentialsDBAccess } from './UserCredentialsDBAccess';



export class Authorizer implements TokenGenerator {

    private userDbAccess : UserCredentialsDBAccess = new UserCredentialsDBAccess();

    async generateToken(account: Account): Promise<SessionToken | undefined> {
        const acc = JSON.stringify(account);
        const obj = JSON.parse(JSON.parse(acc));
        const resultAccount = await this.userDbAccess.getUserCredentials(obj.username,obj.password);
        if (resultAccount) {

            return {
                tokenId: 'someTokenId'
            }
        } else {
            return undefined;
        }
    }

} 