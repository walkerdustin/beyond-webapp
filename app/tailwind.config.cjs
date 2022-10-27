/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
  mode: 'jit', // ⚠ Make sure to have this
  purge: ["./src/**/*.svelte"],
}
