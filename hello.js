const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();

function hello() {
    console.log('hello');
}

eventEmitter.on('hello', hello);

function main() {
    console.log('main');
    // hello();
    eventEmitter.emit('hello');
}

main();