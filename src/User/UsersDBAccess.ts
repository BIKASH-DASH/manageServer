import * as Nedb from 'nedb';
import { User } from '../Shared/Model';

export class UsersDBAccess {

    private nedb: Nedb;

    constructor() {
        this.nedb = new Nedb('database/Users.db');
        this.nedb.loadDatabase();
    }

    public async putUser(user: User) {
        if (!user.id) {
            user.id = this.generateUserId();
        }
        return new Promise((resolve, reject) => {
            this.nedb.insert(user, (err,data:any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        });
    }

    public async getUserById(userId: string): Promise<User | undefined> {
        return new Promise((resolve, reject) => {
            this.nedb.find({ id: userId }, (err: Error, docs: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    if (docs.length == 0) {
                        resolve(undefined);
                    } else {
                        resolve(docs[0]);
                    }
                }
            })
        });
    }

    public async deleteUser (userID:string):Promise<boolean>{
            const operationSuccess = this.deleteUserFromDb(userID);
            this.nedb.loadDatabase();
            return operationSuccess;
    }

    private async deleteUserFromDb(userId: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.nedb.remove({ id: userId }, (err,numRemove:number) => {
                if (err) {
                    reject(err);
                } else {
                    if (numRemove == 0) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                }
            })
        });
    }


    public async getUsersByName(name: string): Promise<User[]> {
        const regEx = new RegExp(name);
        return new Promise((resolve, reject) => {
            this.nedb.find({ name: regEx }, (err: Error, docs: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            })
        });
    }

    private generateUserId() {
        return Math.random().toString(36).slice(2);
    }
}