// 只要传参p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    let len = promises.length;
    if (len === 0) return;
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i])
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

const p1 = new Promise((resolve, reject) => {
  // resolve('hello');
  // throw new Error("报错了");
}).then((result) => result);

const p2 = new Promise((resolve, reject) => {
  // resolve('iamlqy');
  throw new Error("报错了");
}).then((result) => result)
.catch(e => e)

Promise.race([p1, p2])
  .then((result) => console.log(result, '-result')) // Error: 报错了
  .catch((e) => console.log(e));
