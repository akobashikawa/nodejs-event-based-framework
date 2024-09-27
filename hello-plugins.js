const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();

class Plugin {
    constructor() {
        this.cname = this.constructor.name;
    }

    // Emit standard event
    done(newMessage) {
        eventEmitter.emit(`${this.cname}.done`, { message: newMessage });
    }
}

class HelloPlugin extends Plugin {
    constructor() {
        super();
    }

    main(msg) {
        const newMessage = { greeting: msg.greeting }; // Take the message
        console.log(`${this.cname}: ${newMessage.greeting}`);
        this.done(newMessage); // Emit the new message
    }
}

class HelloWorldPlugin extends Plugin {
    constructor() {
        super();
    }

    main(msg) {
        const newMessage = { greeting: `${msg.message.greeting} World!` }; // Take the message
        console.log(`${this.cname}: ${newMessage.greeting}`);
        this.done(newMessage); // Emit the new message
    }
}

class UppercasePlugin extends Plugin {
    constructor() {
        super();
    }

    main(msg) {
        const newMessage = { greeting: msg.message.greeting.toUpperCase() }; // Take the message
        console.log(`${this.cname}: ${newMessage.greeting}`);
        this.done(newMessage); // Emit the new message
    }
}

// Instantiate the plugins
const hello = new HelloPlugin();
const helloWorld = new HelloWorldPlugin();
const uppercase = new UppercasePlugin();

// Define the chains
eventEmitter.on('HelloPlugin', (msg) => hello.main(msg));
eventEmitter.on('HelloPlugin.done', (msg) => helloWorld.main(msg));
eventEmitter.on('HelloWorldPlugin.done', (msg) => uppercase.main(msg));

// Conditional chaining
eventEmitter.on('UppercasePlugin.done', (msg) => {
    if (msg.message.greeting.includes("HELLO")) {
        console.log("Finished: " + msg.message.greeting);
    }
});

function main() {
    eventEmitter.emit('HelloPlugin', { greeting: 'Hello' });
}

main();
