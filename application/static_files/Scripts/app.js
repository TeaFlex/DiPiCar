if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('dipiservice.js')
    	.then((reg) => console.log('Service installation SUCCESS:', reg))
    	.catch((err) => console.log('Service installation FAIL:', err));
  }
