import { UserCredentialsDBAccess } from '../src/Authentication/UserCredentialsDBAccess';
import { UsersDbAccess } from '../src/User/UsersDbAccess';

class DbTest {
    public dbAccess : UserCredentialsDBAccess = new UserCredentialsDBAccess();
    public UsersDbAccess : UsersDbAccess = new UsersDbAccess();

}

// new DbTest().dbAccess.putUserCredentials({
//     username:"user1",
//     password:"password1",
//     accessRights:[1,2,3]
// });

new DbTest().UsersDbAccess.putUser({
    age:30,
    email:'tobikashdash@gmail.com',
    id:"asf212333",
    name:"bikash dash",
    workingPosition:3
})