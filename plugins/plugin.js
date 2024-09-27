class Plugin {
    constructor({ eventEmitter, events }) {
        this.cname = this.constructor.name;
        this.eventEmitter = eventEmitter;
        this.events = events;
        for (let key of Object.keys(events)) {
            eventEmitter.on(key, events[key]);
        }
    }

    validateMsg(msg) {
        if (!msg.message) {
            throw new Error("The message does not have the expected format.");
        }
    }

    // Emit standard event
    done(newMessage) {
        this.eventEmitter.emit(`${this.cname}.done`, { message: newMessage });
    }
}

module.exports = Plugin;