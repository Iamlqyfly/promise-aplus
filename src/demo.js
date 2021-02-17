const delay = (f, time) => value => setTimeout(() => f(value), time)
const isFunction = func => typeof func === 'function';
const toString = Object.prototype.toString
const isObject = obj => toString(obj) === '[object Object]'
const isPromise = promise => promise instanceof Promise
const isThenable = obj => (isObject(obj) || isFunction(obj)) && 'then' in obj

const PENDING = Symbol('pending');
const FULFILLED = Symbol('fulfilled');
const REJECTED = Symbol('rejected');

const transition = (promise, state, result) => {
  if (promise.state != PENDING) return;
  promise.state = state;
  promise.result = result;
  handleCallBacks(promise);
}

const handleCallBacks = delay(promise => {
  let { callbacks, state, result } = promise
	while (callbacks.length) handleCallBack(callbacks.shift(), state, result)
})

const handleCallBack = () => {
  
}