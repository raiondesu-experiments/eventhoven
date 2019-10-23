# eventhoven

> Compose events effortlessly 🎵

[![npm](https://img.shields.io/npm/v/eventhoven.svg?style=flat-square)](https://www.npmjs.com/package/eventhoven "NPM package page")
[![npm](https://img.shields.io/npm/dm/eventhoven.svg?style=flat-square)](https://www.npmjs.com/package/vue-simple-suggest "Downloads per month, but who cares?")
[![size](https://img.shields.io/bundlephobia/minzip/eventhoven@next?style=flat-square)](https://bundlephobia.com/result?p=eventhoven@next "minzipped size")

## What is this?
It's a simple type-safe event manager library for browser and node, less than 1KB (gzipped).

It provides a powerful set of tools for creating and composing event managers.\
In other words, it manages event managers!

A main list of features includes (but not limited to):
- Full tree-shaking
- Functional-style API
- Versatile plugin system (using [meta-events](#meta-events))
- Fully type-safe - each event remembers its type signature
- All functions a curried - makes it easier to use in functionally-structured projects
- **SOLID**
  - **S**RP - every function does only one thing
  - **O**CP - HOFs allow to change certain behaviours without the need to rewrite code
  - **L**SP - all funcions are easily substitutable using dependency injection
    as long as they adhere to the same API
  - **I**SP - all data types are the least specific versions of them
  - **D**IP - API depends only on abstractions
- Code-generation-friendly:\
  Due to the SRP, all functions have a very limited number of ways of invocation.\
  This allows to automatically generate efficient code (for example, CRUD events) for this library without concerns about its stability.
- **DRY** and **KISS**

## Disclaimer

`eventhoven`'s main concern is type-safety at every step, so all the code examples will be written in [typescript](https://www.typescriptlang.org).

## Table of Contents

- [eventhoven](#eventhoven)
  - [What is this?](#what-is-this)
  - [Disclaimer](#disclaimer)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Importing](#importing)
    - [Simple usage example](#simple-usage-example)
  - [API](#api)


## Installation

**npm**:
```bash
npm i -S eventhoven
```

**module**: see [usage](#usage)

Currently, only installation through [`npm`](https://www.npmjs.com/package/eventhoven) or `script[type=module]` is supported.\
No single-file bundles just yet.

### Importing

```ts
// TS-module (pure typescript),
// allows compilation settings to be set from the project config
import { emit, on, off } from 'eventhoven/src';

// ES-module (node, typescript)
import { emit, on, off } from 'eventhoven';

// ES-module (browser)
import { emit, on, off } from 'https://unpkg.com/eventhoven/dist/es';

// Classic node commonjs
const { emit, on, off } = require('eventhoven/dist/js');
```

### Simple usage example

```ts
// Essential imports
import { eventMap, emit, on, off } from 'eventhoven';

type Todo = { done: boolean; text: string; };

// Event map declaration
const todoEvents = eventMap({
  // key - event name,
  // function arguments - event arguments,
  // function body - default handler for the event
  // (leave emtpy if you need to just declare the event)
  'todo-added'(newTodo: Todo, todos: Todo[]) {},
  'done-change'(todo: Todo, newDone: boolean) {},
  'text-change'(todo: Todo, newText: string) {},
});

const emitTodoEvent = emit(todoEvents);
const addTodo = emitTodoEvent('todo-added');
```

## API

General exports are the following:

name | type | description
-----|------|--------------------
[`eventMap`](#eventmap) | `function` | Event map factory
[`emit`](#emit) | `function` | Event emitter factory
[`subscribe`](#subscribe) | `function` | Event subscriber factory
[`subscribeToAll`](#subscribetoall) | `function` | Event subscriber factory for all events in a collection
[`on`](#subscribe) | `function` | Alias for [`subscribe`](#subscribe)
[`onAll`](#subscribetoall) | `function` | Alias for [`subscribeAll`](#subscribetoall)
[`unsubscribe`](#unsubscribe) | `function` | Event unsubscriber factory
[`unsubscribeFromAll`](#unsubscribefromall) | `function` | Event unsubscriber factory
[`off`](#unsubscribe) | `function` | Alias for [`unsubscribe`](#unsubscribe)
[`offAll`](#unsubscribefromall) | `function` | Alias for [`unsubscribeFromAll`](#unsubscribefromall)
[`offAll`](#unsubscribefromall) | `function` | Alias for [`unsubscribeFromAll`](#unsubscribefromall)
[`emitCollection`](#emitcollection) | `function` | Creates a collection of event-emitters from an event map
[`subscribeCollection`](#subscribecollection) | `function` | Creates a collection of event-subscribers from an event map
[`unsubscribeCollection`](#unsubscribecollection) | `function` | Creates a collection of event-unsubscribers from an event map
[`eventCollection`](#eventcollection) | `function` | Creates a collection of the three previous collections from an event map
[`debug`](#debug) | `function` | Sets the debug mode (if enabled - logs all events to the console)
[`metaEvents`](#metaevents) | `object` | A meta-event map. Can be used to subscribe to the internal eventhoven's events
[`meta`](#meta) | `object` | A meta-event emitters collection. An [`emitCollection`](#emitcollection) created for [`metaEvents`](#metaevents)


⚠ More coming soon ⚠
