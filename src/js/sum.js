/*
 * @Author: 张思勉
 * @Date: 2023-04-01 21:48:43
 * @LastEditTime: 2023-04-01 21:50:35
 * @LastEditors: 张思勉
 * @Description:
 * @FilePath: \webpack\src\js\sum.js
 */
export default function sum(...args) {
  return args.reduce((x, y) => x + y, 0);
}
