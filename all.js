Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let len = promises.length,
        index = 0,
        result = [];
    if (len == 0) return resolve(result);
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(data => {
        result[i] = data;
        index++;
        if (index == len) return resolve(result);
      }).catch(err => {
        reject(err);
      })
    }
  })
}
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
// .catch(e => e); // p2有自己的catch，so，

// p2首先会rejected，但是p2有自己的catch方法，该方法返回的是一个新的 Promise 实例，
// p2指向的实际上是这个实例。该实例执行完catch方法后，也会变成resolved，
// 导致Promise.all()方法参数里面的两个实例都会resolved，因此会调用then方法指定的回调函数，
// 而不会调用catch方法指定的回调函数

Promise.all([p1, p2])
.then(result => console.log(result,'--result')) // ['hello', Error: 报错了]
.catch(e => console.log(e,'---e'));  // Error: 报错了

// 如果p2 没有自己的catch方法，那最终会调用Promise.all 的catch方法
