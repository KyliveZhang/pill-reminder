self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  self.registration.showNotification(data.title || '吃药提醒', {
    body: data.body || '',
    icon: '💊',
    tag: 'pill-reminder',
    requireInteraction: true,
    vibrate: [300, 150, 300, 150, 500]
  });
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({type:'window'}).then(clients => {
      if(clients.length > 0) clients[0].focus();
      else self.clients.openWindow('.');
    })
  );
});
