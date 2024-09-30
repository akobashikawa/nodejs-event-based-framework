const Plugin = require('./plugin');

class HelloPlugin extends Plugin {
    constructor({ eventEmitter, events }) {
        super({ eventEmitter, events });
    }

    main(msg) {
        this.start(msg);
        const newMessage = { greeting: msg.greeting }; // Take the message
        console.log(`${this.cname}: ${newMessage.greeting}`);
        this.done(newMessage); // Emit the new message
    }
}

module.exports = HelloPlugin;