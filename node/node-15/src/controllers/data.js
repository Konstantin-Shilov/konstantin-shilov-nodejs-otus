const axios = require('axios');

async function fetchData() {
  const list = await axios.get('https://reqres.in/api/unknown');

  return list.data;
}

const getData = async (req, res, next) => {
  const facts = await fetchData();
  res.status(200).json(facts);
  req.cache.set(req.path, facts);
};

module.exports = {
  getData
};
