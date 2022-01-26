import { TokenGenerator, Account, SessionToken, TokenValidator, TokenRights, TokenState } from '../Server/Model';
import { UserCredentialsDBAccess } from './UserCredentialsDBAccess';
import { SessionTokenDBAccess } from './SessionTokenDBAccess';



export class Authorizer implements TokenGenerator,TokenValidator {


    private userDbAccess : UserCredentialsDBAccess = new UserCredentialsDBAccess();
    private sessionDbAccess:SessionTokenDBAccess = new SessionTokenDBAccess();

    async generateToken(account: Account): Promise<SessionToken | undefined> {
        const acc = JSON.stringify(account);
        const obj = JSON.parse(JSON.parse(acc));
        const resultAccount = await this.userDbAccess.getUserCredentials(obj.username,obj.password);
        if (resultAccount) {
            const token:SessionToken = {
                accessRights:resultAccount.accessRights,
                expirationTime:this.generateExpiationTime(),
                username : resultAccount.username,
                valid:true,
                tokenId: this.generateRandomTokenID()
            }

           await this.sessionDbAccess.storeSessionToken(token);
           return token;
        } else {
            return undefined;
        }
    }

    private generateExpiationTime (){
        return new Date(Date.now()+60*60*1000)
    }

    private generateRandomTokenID (){
        return Math.random().toString(36).slice(2)
    }

    public async   validateToken(tokenID: string): Promise<TokenRights> {
        const token = await this.sessionDbAccess.getToken(tokenID);
        if(!token || !token.valid){
            return {
                accessRights:[],
                state:TokenState.INVALID
            }
        }else if(token.expirationTime < new Date){
            return{
                accessRights:[],
                state:TokenState.EXPIRED
            }
        }else{
            return {
                accessRights:token.accessRights,
                state:TokenState.VALID
            }
        }

    }

}