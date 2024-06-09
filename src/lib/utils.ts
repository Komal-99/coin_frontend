import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {  init } from '@paralleldrive/cuid2';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const createId = init({
  // A custom random function with the same API as Math.random.
  // You can use this to pass a cryptographically secure random function.
  random: Math.random,
  // the length of the id
  length: 10,
  // A custom fingerprint for the host environment. This is used to help
  // prevent collisions when generating ids in a distributed system.
  fingerprint: 'coin-based-system',
});

export function createRandomId() {
  return createId();
}