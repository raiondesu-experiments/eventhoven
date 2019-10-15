type TEventHandlerDict<Event extends TEventHandler> = Map<Event, boolean>;

type TMutableEventMap<Events extends IEventOptions = IEventOptions> = {
  [event in keyof Events | '*']: TEventHandlerDict<Events[event]>;
};

// Duplicate code because of VSCode's inability to correctly interpret type extensions
export type TEventMap<Events extends IEventOptions = IEventOptions> = {
  readonly [event in keyof Events | '*']: TEventHandlerDict<Events[event]>;
};

export type TEventHandler = (...args: any[]) => void;

export type THandlerOf<
  M extends TEventMap,
  N extends keyof M = keyof M,
  EventValue extends M[N] = M[N]
> = EventValue extends TEventHandlerDict<infer H>
  ? H
  : M[keyof M] extends TEventHandlerDict<infer H>
    ? H
    : TEventHandler;

export type THandlerMap<M extends TEventMap> = {
  [event in keyof M]: THandlerOf<M, event>;
};

export interface IEventOptions {
  [name: string]: TEventHandler;
}

export const eventMap = <Events extends IEventOptions>(
  ...events: Array<keyof Events>
): TEventMap<Events> => events.reduce((map, event) => {
  map[event] = new Map();

  return map;
}, {
  '*': new Map()
} as TMutableEventMap<Events>);
