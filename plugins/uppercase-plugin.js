const Plugin = require('./plugin');

class UppercasePlugin extends Plugin {
    constructor({ eventEmitter, events }) {
        super({ eventEmitter, events });
    }

    validateMsg(msg) {
        super.validateMsg(msg);
        if (!msg.greeting) {
            throw new Error("The message does not have the expected format.");
        }
    }

    main(msg) {
        try {
            this.validateMsg(msg); // Validate the received message
            const newMessage = { greeting: msg.greeting.toUpperCase() }; // Take the message
            console.log(`${this.cname}: ${newMessage.greeting}`);
            this.done(newMessage); // Emit the new message
        } catch (error) {
            console.error(`${this.cname} error: ${error.message}`);
        }
    }
}

module.exports = UppercasePlugin;