"use strict";

// Make sure sw are supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('serviceworker.js')
            .catch(err => console.log(`Service Worker: Error: ${err}`));
    });
}


// ask for notification permission
window.addEventListener('load', () => {
    Notification
        .requestPermission()
        .catch(err => console.log(`Notification Permission: Error: ${err}`));
})