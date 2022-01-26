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

}