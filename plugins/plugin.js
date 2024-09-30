class Plugin {
    constructor({ eventEmitter, events }) {
        this.cname = this.constructor.name;
        this.eventEmitter = eventEmitter;
        this.events = events;

        // Listeners
        for (let key of Object.keys(events)) {
            eventEmitter.on(key, events[key]);
        }
    }

    validateMsg(msg) {
        // if (!msg.message) {
        //     throw new Error("The message does not have the expected format.");
        // }
    }

    // Emit standard event
    emitEvent(name, message) {
        console.log(`> emitEvent: ${this.cname}.${name}`, { ...message });
        this.eventEmitter.emit(`${this.cname}.${name}`, { ...message });
    }

    start(message) {
        this.emitEvent('start', message);
    }

    done(message) {
        this.emitEvent('done', message);
    }
}

module.exports = Plugin;