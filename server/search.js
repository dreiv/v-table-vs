const store = require("./data.json");

const search = (query) => {
  return store.slice(0, 100);
};

module.exports = { search };
