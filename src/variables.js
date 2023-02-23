export const LS_KEY = "pokemon";
export const DEBUG = false;
export const DEBUG_CLEAR_CACHE = false; // Clear cache after initializing (requires DEBUG)
//export const API_URL = "https://pokeapi.co/api/v2/pokemon/";

// Variadic debug function
export function dbg(...args) {
    if (DEBUG) {
        console.log(...args);
    }
}

// Warnings and debug messages

if (DEBUG) {
    console.log("DEBUG: DEBUG is enabled");
}

if (DEBUG_CLEAR_CACHE) {
    if (!DEBUG) console.warn("DEBUG_CLEAR_CACHE is enabled, but DEBUG is not. This will have no effect.");
    else {
        console.log("DEBUG_CLEAR_CACHE is enabled, cache will be cleared after initialization");
    }
}