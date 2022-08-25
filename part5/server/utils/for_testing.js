// some known libraries for unit test, eg, Mocha, jest

const reverse = (string) => {
  return string.split("").reverse().join("");
};

// const avg = (array) => {
//   const reducer = (sum, item) => {
//     return sum + item;
//   };
//   return array.reduce(reducer, 0) / array.length;
// }; // do exist bug

const avg = (array) => {
  const reducer = (sum, item) => {
    return sum + item;
  };
  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
};

module.exports = {
  reverse,
  avg,
};

// npm install --save-dev jest // for dev purpose only
