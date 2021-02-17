Promise.any = function(promises) {
  return new Promise((resolve, reject) => {
    let len = promises.length,
        index = 0,
        result = [];
    if (len == 0) return reject(result);
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(data => {
        return resolve(data);
      }).catch(err => {
        result[i] = err;
        index++;
        if (index == len) return reject(result);
      })
    }
  })
}

var resolved = Promise.resolve(42);
var rejected = Promise.reject(-1);
var alsoRejected = Promise.reject(Infinity);
Promise.any([resolved, rejected, alsoRejected]).then(function (result) {
  console.log(result); // 42
});
Promise.any([rejected, alsoRejected]).catch(function (results) {
  console.log(results); // [-1, Infinity]
});

// console.log(Promise.any([]))