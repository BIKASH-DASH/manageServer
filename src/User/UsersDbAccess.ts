import * as Nedb from 'nedb';
import { User } from '../shared/Model';

export class UsersDbAccess {
    private nedb: Nedb ;

    constructor(){
        this.nedb = new Nedb('database/Users.db');
        this.nedb.loadDatabase();
    }

    public async putUser(user:User):Promise<void> {
        return new Promise ((resolve,reject)=>{
            this.nedb.insert(user,(error)=>{
                if(error){
                    reject(error)
                }else{
                    resolve()
                }
            })
        })
    }

    public async getUserByID(userID:string): Promise<User | undefined> {
        return new Promise ((resolve,reject)=>{
            this.nedb.find({id:userID},(err:Error,dock:any)=>{
                if(err){
                    reject(err)
                }else{
                    if(dock.length==0){
                        resolve(undefined)
                    }else{
                        resolve(dock[0])
                    }
                }
            })
        })
    }

}