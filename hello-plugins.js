const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();

class Plugin {
    constructor() {
        this.cname = this.constructor.name;
    }

    // Emitir un evento estándar
    done(newMessage) {
        eventEmitter.emit(`${this.cname}.done`, { message: newMessage });
    }
}

class HelloPlugin extends Plugin {
    constructor() {
        super();
    }

    main(msg) {
        const newMessage = { greeting: msg.greeting }; // Tomamos msg.greeting
        console.log(`${this.cname}: ${newMessage.greeting}`);
        this.done(newMessage); // Emitimos el nuevo mensaje
    }
}

class HelloWorldPlugin extends Plugin {
    constructor() {
        super();
    }

    main(msg) {
        // Aseguramos que msg.message.greeting está definido
        const newMessage = { greeting: `${msg.message.greeting} World!` };
        console.log(`${this.cname}: ${newMessage.greeting}`);
        this.done(newMessage); // Emitimos el nuevo mensaje
    }
}

class UppercasePlugin extends Plugin {
    constructor() {
        super();
    }

    main(msg) {
        // Aseguramos que msg.message.greeting está definido
        const newMessage = { greeting: msg.message.greeting.toUpperCase() };
        console.log(`${this.cname}: ${newMessage.greeting}`);
        this.done(newMessage); // Avisa que terminó
    }
}

// Instanciamos los plugins
const hello = new HelloPlugin();
const helloWorld = new HelloWorldPlugin();
const uppercase = new UppercasePlugin();

// Defino el encadenamiento
eventEmitter.on('HelloPlugin', (msg) => hello.main(msg));
eventEmitter.on('HelloPlugin.done', (msg) => helloWorld.main(msg));
eventEmitter.on('HelloWorldPlugin.done', (msg) => uppercase.main(msg));

// Encadenamiento condicional
eventEmitter.on('UppercasePlugin.done', (msg) => {
    if (msg.message.greeting.includes("HELLO")) {
        console.log("Finalizado: " + msg.message.greeting);
    }
});

function main() {
    eventEmitter.emit('HelloPlugin', { greeting: 'Hello' });
}

main();
