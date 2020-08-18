const cache = new Map();

function set(key, value, seconds = 60) {
  return cache.set(key, [value, Date.now(), seconds]);
}

function get(key) {
  return has(key) && !isExpired(key) && cache.get(key)[0];
}

function has(key) {
  return cache.has(key);
}

function isExpired(key) {
  const [_, timestamp, seconds] = cache.get(key);

  return (Date.now() - timestamp) / 1000 > seconds;
}

module.exports = {
  get,
  set,
};
