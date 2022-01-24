
import Server from './Server/Server';
class Launcher {
    private name : string;
    private server : Server;

    constructor(){
        this.server = new Server();
        this.name = 'server'
    }

    public LaunchApp(){
        console.log('app----');
        this.server.createServer();
        
    }
}

new Launcher().LaunchApp();