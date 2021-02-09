/**
 * Promise.resolve('foo') -> new Promise(resolve => resolve('foo'))
 * 
 * 
 * Promise.resolve()方法的参数分成三种情况
   1.参数是一个 Promise 实例 -Promise.resolve将不做任何修改、原封不动地返回这个实例
   2.参数是一个thenable对象-Promise.resolve()方法会将这个对象转为 Promise 对象，然后就立即执行
   返回的 Promise 会跟随这个对象，采用它的最终状态作为自己的状态
  
   let thenable = {
    then: function(resolve, reject) {
      resolve(42);
    }
  };

  3.其他情况，直接返回以该值为成功状态的promise对象。
 */

Promise.resolve = function (param) {
  if (param instanceof Promise) return param;
  return new Promise((resolve, reject) => {
    if (param && param.then && typeof param.then == "function") {
      // param 状态变为成功会调用resolve，将新 Promise 的状态变为成功，反之亦然
      param.then(resolve, reject);
    } else {
      resolve(param);
    }
  });
};
