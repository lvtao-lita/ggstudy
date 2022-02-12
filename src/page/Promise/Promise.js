class MyPromise {
  // 1、Promise三种状态
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "reject";

  state = undefined;
  result = undefined;
  fulfilledQueue = [];
  rejectQueue = [];
  finallyQueue = [];
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("Promise resolver undefined is not a function");
    }
    this.state = MyPromise.PENDING;
    executor(this.resolve, this.reject);
  }

  fulfilledCall = () => {
    this.fulfilledQueue?.forEach(({ fulfilled, nextFulfilled }) => {
      const temp = fulfilled?.(this.result);
      nextFulfilled(temp);
    });
  };

  rejectCall = () => {
    this.rejectQueue?.forEach(({ reject, nextReject }) => {
      const temp = reject?.(this.result);
      nextReject?.(temp || this.result);
    });
  };

  resolve = (value) => {
    if (this.state !== MyPromise.PENDING) return;
    this.state = MyPromise.FULFILLED;
    this.result = value;
    this.fulfilledCall();
  };

  reject = (error) => {
    if (this.state !== MyPromise.PENDING) return;
    this.state = MyPromise.REJECT;
    this.result = error;
    this.rejectCall();
  };

  then = (fulfilled, reject) => {
    return new MyPromise((nextFulfilled, nextReject) => {
      this.fulfilledQueue.push({
        fulfilled,
        nextFulfilled,
      });
      this.rejectQueue.push({
        reject,
        nextReject,
      });
      if (this.state === MyPromise.FULFILLED) {
        this.fulfilledCall();
      } else if (this.state === MyPromise.REJECT) {
        this.rejectCall();
      }
    });
  };

  catch = (reject) => {
    this.then(null, reject);
  };
}

const executor1 = (resolve, reject) => {
  setTimeout(() => {
    console.log("异步操作.......");
    const result = true;
    if (result) {
      resolve("获取数据成功");
    } else {
      reject("获取数据失败");
    }
  }, 1000);
};
const executor2 = (resolve, reject) => {
  setTimeout(() => {
    console.log("异步操作.......");
    const result = false;
    if (result) {
      resolve(result);
    } else {
      reject("获取数据失败");
    }
  }, 2000);
};

const p = new MyPromise(executor1);
p.then((res) => {
  console.log("第一条-----", res);
  return "第二条-----";
})
  .then((res) => {
    console.log(res);
    return "第三条------";
  })
  .then((res) => {
    console.log(res);
  });
p.catch((error) => {
  console.log(error);
});

const p2 = new MyPromise(executor2);
p2.then((res) => {
  console.log(res);
}).catch((e) => console.log(e));
