import { UserCredentials } from '../shared/Model';
export class  UserCredentialsDBAccess {
    
    public async putUserCredentials(userCredentials:UserCredentials):Promise<any>{

    }

    public async getUserCredentials(username:string,password:string):Promise<UserCredentials | undefined>{

    }
}