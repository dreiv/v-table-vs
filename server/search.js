const store = require("./data.json");

function search(pageNumber, pageSize) {
  const offset = pageNumber * pageSize;

  return store.slice(offset, pageSize);
}

module.exports = { search };
