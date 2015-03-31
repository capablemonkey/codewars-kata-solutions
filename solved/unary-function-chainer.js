function chained(functions) {
  return function(input) {
    return functions.reduce(function(prev, curr, index, array) {
      return curr(prev);
    }, input)
  };
}