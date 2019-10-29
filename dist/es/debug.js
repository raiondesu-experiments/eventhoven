import { metaEvents } from "./meta-events.js";
import { onAll } from "./subscribe.js";
import { offAll } from "./unsubscribe.js";
const onMeta = onAll(metaEvents);
const offMeta = offAll(metaEvents);
const log = ({ event }, _map, eventName, argsOrHandler) => console.log(`${new Date().toJSON().substr(14, 9)} [${event.toUpperCase()} "${String(eventName)}"] -`, ...(Array.isArray(argsOrHandler)
    ? argsOrHandler
    : [argsOrHandler]));
export const debug = ({ enable, log: logEvent = log }) => (enable ? onMeta : offMeta)(logEvent);
//# sourceMappingURL=debug.js.map