var sum_pairs=function(ints, s){
    //your code here
    for (var i=0; i < ints.length - 1; i++) {
      for (var n = i + 1; n < ints.length; n++) {
        if (ints[i] + ints[n] === s) return [ints[i], ints[n]];
      }
    }

    return null;
};

l1= [1, 4, 8, 7, 3, 15];
l2= [1, -2, 3, 0, -6, 1];
l3= [20, -13, 40];
l4= [1, 2, 3, 4, 1, 0];
l5= [10, 5, 2, 3, 7, 5];
l6= [4, -2, 3, 3, 4];
l7= [0, 2, 0];
l8= [5, 9, 13, -3];

console.log(sum_pairs(l1, 8));
console.log(sum_pairs(l2, -6))
console.log(sum_pairs(l5, 10));