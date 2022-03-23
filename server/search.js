const store = require("./data.json");
const { indexes } = require("./indexes.js");

function search(from, to, sortBy) {
  if (!sortBy) return;

  return {
    records: indexes[sortBy].slice(from, to).map((index) => store[index]),
    total: indexes[sortBy].length,
  };
}

module.exports = { search };
