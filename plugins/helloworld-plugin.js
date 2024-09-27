const Plugin = require('./plugin');

class HelloWorldPlugin extends Plugin {
    constructor({ eventEmitter, events }) {
        super({ eventEmitter, events });
    }

    // Specific validation for this plugin
    validateMsg(msg) {
        super.validateMsg(msg); // Calls for general validation
        if (!msg.message.greeting) {
            throw new Error("The message does not have the expected format."); // Throws an error if greeting is not present
        }
    }

    main(msg) {
        try {
            this.validateMsg(msg); // Validate the received message
            const newMessage = { greeting: `${msg.message.greeting} World!` }; // Take the message
            console.log(`${this.cname}: ${newMessage.greeting}`);
            this.done(newMessage); // Emit the new message
        } catch (error) {
            console.error(`${this.cname} error: ${error.message}`);
        }
    }
}

module.exports = HelloWorldPlugin;