import { UserCredentials } from '../shared/Model';
import * as Nedb from 'nedb';
export class  UserCredentialsDBAccess {

    private nedb: Nedb ;

    constructor(){
        this.nedb = new Nedb('database/UserCredentials.db');
        this.nedb.loadDatabase();
    }
    
    public async putUserCredentials(userCredentials:UserCredentials):Promise<any>{
        return new Promise((resolve, reject) => {
            this.nedb.insert(userCredentials, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs)
                }
            })
        });
    }

    public async getUserCredentials(username:string,password:string):Promise<UserCredentials | undefined>{
            return new Promise((resolve,reject)=>{
                this.nedb.find({
                    username,
                    password
                },(error:Error,dock:UserCredentials[])=>{
                    if(error){
                        reject(error)
                    }else{
                       if(dock.length == 0){
                           resolve(undefined);
                       }else{
                           resolve(dock[0])
                       }
                    }
                })
            })
    }
}