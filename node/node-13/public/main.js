if ('serviceWorker' in navigator) {
  window.addEventListener('load', registerServiceWorker);

  navigator.serviceWorker.onmessage = function(event) {
    showNotification(event.data);
  };
}

async function registerServiceWorker() {
  try {
    await navigator.serviceWorker.register('/sw.js');
    requestNotificationPermission();
  } catch (error) {
    console.log(`ServiceWorker registration failed: ${error}`);
  }
}

function requestNotificationPermission() {
  if ('Notification' in window && window.Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
}

function showNotification(text, options = { title: 'Title', lifetime: 3000 }) {
  const notificationIsAvailable = 'Notification' in window && window.Notification.permission === 'granted';

  if (!notificationIsAvailable) {
    return;
  }

  const { title, lifetime } = options;
  const notification = new Notification(title, {
    body: text,
    tag: 'soManyNotification',
  });

  notification.onclick = () => {
    parent.focus();
    window.focus();
    this.close();
  };
  setTimeout(notification.close.bind(notification), lifetime);
}
