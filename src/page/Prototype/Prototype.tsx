import React from "react";

interface IPrototypeProps {}

const Prototype: React.FC<IPrototypeProps> = (props: IPrototypeProps) => {
  function Test() {}
  console.log(Text.prototype);

  const test = new Test();
  console.log(test.__proto__);

  console.log(test.__proto__ === Test.prototype); //true

  console.log(Test.prototype.__proto__ === Object.prototype); //true

  test.a = 1;

  Test.prototype.b = 2;
  // Object.prototype.c = 3;

  // console.log(test.a, test.b, test.c);

  // console.log(Function.prototype);
  // console.log(Function.__proto__);
  // console.log(Function.prototype === Function.__proto__); //true

  /**
   * Function 既是函数也是对象，都有自己的prototype和__proto__属性，切Function.prototype === Function.__proto__
   */

  // const obj = {};
  // const obj = new Object();
  // console.log(typeof Object); //function
  // console.log(Object.__proto__ === Function.prototype); //true
  // console.log(Object.__proto__ === Function.__proto__); //true

  /**
   * Object 也是函数有自己的prototype和__proto__属性。
   * Object.__proto__ === Function.prototype
   */

  console.log(test.hasOwnProperty("a")); //true
  console.log(test.hasOwnProperty("b")); //false
  console.log(test.hasOwnProperty("c")); //false

  console.log("a" in test); //true
  console.log("b" in test); //true
  console.log("c" in test); //true

  return <div>Prototype</div>;
};
export default Prototype;
