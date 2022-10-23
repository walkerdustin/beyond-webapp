import { writable } from 'svelte/store';

export const login = writable({
  username: "",
  password: "",
});