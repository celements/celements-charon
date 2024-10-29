import type { Ref } from 'vue';
import { watch } from 'vue';

/**
 * Creates a synchronized version of a promise-returning function, ensuring that multiple simultaneous
 * calls result in a single execution and subsequent calls await the current active promise.
 */
export const syncDebounce = <T>(func: () => Promise<T>) => {
  let lock: Promise<T> | null = null;
  return async () => {
    if (lock) return await lock;
    try {
      lock = func();
      return await lock;
    } finally {
      lock = null;
    }
  };
};

export class DeferredPromise<T> {
  #operation: () => Promise<T>;
  #promise: Promise<T>;
  #triggered: boolean;
  #resolve!: (value: T | PromiseLike<T>) => void;
  #reject!: (reason?: unknown) => void;

  constructor(operation: () => Promise<T>) {
    this.#operation = operation;
    this.#promise = new Promise<T>((resolve, reject) => {
      this.#resolve = resolve;
      this.#reject = reject;
    });
    this.#triggered = false;
  }

  get promise() {
    return this.#promise;
  }

  get triggered() {
    return this.#triggered;
  }

  trigger() {
    if (this.#triggered) throw new Error('Already triggered');
    this.#operation().then(this.#resolve).catch(this.#reject);
    this.#triggered = true;
    return this.#promise;
  }
}

/**
 * Watch for a Ref value to be filled (not null/undefined/empty) and returns a promise.
 * @param ref - The Ref value to watch.
 * @param checkCondition - Optional custom condition to define when the value is considered "filled".
 * @returns Promise<void> - Resolves when the Ref value is filled.
 */
export function watchUntil<T>(ref: Ref<T>, checkCondition: (value: T) => boolean = (value) => !!value): Promise<void> {
  if (checkCondition(ref.value)) return Promise.resolve();
  return new Promise((resolve) => {
    const stop = watch(ref, (newValue) => {
      if (checkCondition(newValue)) {
        stop();
        resolve();
      }
    });
  });
}
