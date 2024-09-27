const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();

const HelloPlugin = require('./plugins/hello-plugin');
const HelloWorldPlugin = require('./plugins/helloworld-plugin');
const UppercasePlugin = require('./plugins/uppercase-plugin');

// Instantiate the plugins and define the chains
const hello = new HelloPlugin({
    eventEmitter,
    events: {
        'HelloPlugin': (msg) => hello.main(msg),
    },
});
const helloWorld = new HelloWorldPlugin({
    eventEmitter,
    events: {
        'HelloPlugin.done': (msg) => helloWorld.main(msg),
    },
});
const uppercase = new UppercasePlugin({
    eventEmitter,
    events: {
        'HelloWorldPlugin.done': (msg) => uppercase.main(msg),
        // Conditional chaining
        'UppercasePlugin.done': (msg) => {
            if (msg.message.greeting.includes("HELLO")) {
                console.log("Finalizado: " + msg.message.greeting);
            }
        },
    }
});

function main() {
    eventEmitter.emit('HelloPlugin', { greeting: 'Hello' });
}

main();
