Promise.reject = function(reason) {
  return new Promise((resolve, reject) => {
    return reject(reason)
  })
}

Promise.reject = (reason) => new Promise((resolve, reject) => reject(reason));