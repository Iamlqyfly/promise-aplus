// 提案 - https://github.com/tc39/proposal-promise-allSettled

const formateSettleResult = (success, value) => {
  return success ? { status: 'fulfilled', value } : { status: 'rejected', reason: value }
}

const commonSettleRes = function(settleList, index, settleNum, len, key, value) {
  settleList[index] = formateSettleResult(key, value)
  if (++settleNum === len) {
    resolve(settleList)
  }
}
Promise.allSettled = function(iterators) {
  const promises = Array.from(iterators);
  const len = promises.length;
  const settleList = new Array(len);
  let settleNum = 0;

  return new Promise((resolve) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
      .then(value => {
        settleList[index] = formateSettleResult(true, value)
        if (++settleNum === len) {
          resolve(settleList)
        }
      })
      .catch(error => {
        settleList[index] = formateSettleResult(false, error);
        if (++settleNum === len) {
          resolve(settleList)
        }
      })
    })
  })
}

var resolved = Promise.resolve(42);
var rejected = Promise.reject(-1);
var alsoRejected = Promise.reject(Infinity);
Promise.allSettled([resolved, rejected, alsoRejected]).then(function (result) {
  console.log(result); 
});