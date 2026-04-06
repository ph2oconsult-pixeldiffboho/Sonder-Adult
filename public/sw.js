// Sonder Push Service Worker
// Receives push events and shows notifications
// No caching, no offline support — just push

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const message = data.message || "It came back.";

  event.waitUntil(
    self.registration.showNotification("Sonder", {
      body: message,
      icon: undefined,
      badge: undefined,
      silent: false,
      tag: "sonder-touch",
      renotify: true,
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      // Focus existing tab if open
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          return client.focus();
        }
      }
      // Otherwise open new tab
      return clients.openWindow("/");
    })
  );
});
