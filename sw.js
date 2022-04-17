var APP_PREFIX = 'cluedo_notes_'; // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'version_1.2.4'; // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION;
var URLS = [
	'/cluedo-notes/',
	'/cluedo-notes/index.html',
	'/cluedo-notes/fonts/Futura-CondensedBoldOblique.otf',
	'/cluedo-notes/fonts/Futura-CondensedExtraBold.otf',
	'/cluedo-notes/fonts/Futura-CondensedExtraBold.woff',
	'/cluedo-notes/fonts/Futura-CondensedExtraBold.woff2',
	'/cluedo-notes/img/cluedo.jpg',
	'/cluedo-notes/img/dr-orchid.jpg',
	'/cluedo-notes/img/mrs-white.jpg',
	'/cluedo-notes/js/create_start_form.js',
	'/cluedo-notes/js/create_table.js',
	'/cluedo-notes/js/data.js',
	'/cluedo-notes/js/update_icon.js',
	'/cluedo-notes/styles.css',
	'/cluedo-notes/icons/favicon.png',
	'/cluedo-notes/icons/logo192.png',
	'/cluedo-notes/icons/logo512.png',
	'/cluedo-notes/manifest.json',
];

// Respond with cached resources
self.addEventListener('fetch', function (e) {
	console.log('fetch request : ' + e.request.url);
	e.respondWith(
		caches.match(e.request).then(function (request) {
			if (request) {
				// if cache is available, respond with cache
				console.log('responding with cache : ' + e.request.url);
				return request;
			} else {
				// if there are no cache, try fetching request
				console.log('file is not cached, fetching : ' + e.request.url);
				return fetch(e.request);
			}

			// You can omit if/else for console.log & put one line below like this too.
			// return request || fetch(e.request)
		})
	);
});

// Cache resources
self.addEventListener('install', function (e) {
	e.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			console.log('installing cache : ' + CACHE_NAME);
			return cache.addAll(URLS);
		})
	);
});

// Delete outdated caches
self.addEventListener('activate', function (e) {
	e.waitUntil(
		caches.keys().then(function (keyList) {
			// `keyList` contains all cache names under your username.github.io
			// filter out ones that has this app prefix to create white list
			var cacheWhitelist = keyList.filter(function (key) {
				return key.indexOf(APP_PREFIX);
			});
			// add current cache name to white list
			cacheWhitelist.push(CACHE_NAME);

			return Promise.all(
				keyList.map(function (key, i) {
					if (cacheWhitelist.indexOf(key) === -1) {
						console.log('deleting cache : ' + keyList[i]);
						return caches.delete(keyList[i]);
					}
				})
			);
		})
	);
});
