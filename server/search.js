const store = require("./data.json");
const { indexes } = require("./indexes.js");

function search(pageNumber, pageSize, sortBy) {
  if (!sortBy) return;
  const offset = pageNumber * pageSize;

  return indexes[sortBy].slice(offset, pageSize).map((index) => store[index]);
}

// function search() {
//   return store
//     .map((item, index) => ({ ...item, index }))
//     .sort((a, b) => a.type.localeCompare(b.type))
//     .map(({index}) => index);
// }

module.exports = { search };
