import { reduceEvents } from './util';

type TEventHandlerData<Event extends TEventHandler> = {
  arity: number;
  handlers: Map<Event, boolean>;
};

export type TEventMap<Events extends TEventOptions = TEventOptions> = {
  readonly [event in keyof Events]: TEventHandlerData<Events[event]>;
};

export type TEventHandler = (...args: any[]) => void;

export type THandlerOf<
  M extends TEventMap,
  N extends keyof M = keyof M,
  EventValue extends M[N] = M[N]
> = EventValue extends TEventHandlerData<infer H>
  ? H
  : M[keyof M] extends TEventHandlerData<infer H>
    ? H
    : TEventHandler;

export type THandlerMap<M extends TEventMap> = {
  [event in keyof M]: THandlerOf<M, event>;
};

export type TEventOptions = {
  [name in PropertyKey]: TEventHandler;
}

export const eventMap = <Events extends TEventOptions>(
  events: Events
): TEventMap<Events> => reduceEvents(
  events,
  (key, obj) => ({
    arity: obj[key].length,
    handlers: new Map([[obj[key], false]]),
  })
);
