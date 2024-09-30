const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();

const HelloPlugin = require('./plugins/hello-plugin');
const HelloWorldPlugin = require('./plugins/helloworld-plugin');
const UppercasePlugin = require('./plugins/uppercase-plugin');

// Instantiate the plugins and define the chain
const hello = new HelloPlugin({
    eventEmitter,
    events: {
        'main.start': (msg = { greeting: 'Hello' }) => hello.main(msg),
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
            const greeting = msg.greeting;
            if (greeting.includes("HELLO")) {
                console.log("Finished: " + greeting);
            }
        },
    }
});

function main() {
    eventEmitter.emit('main.start');
}

main();
