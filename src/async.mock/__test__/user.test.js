import { verifyUsername } from "../verify";
import { register } from "../user";
// TODO feedback: axios是我们装的node module, 不是我们自己写的module, 它的mock文件是src/async/__mocks__/axios.js。
// 所以，我把你自己写的那个axios.js删掉了，并且把post的mock移到了src/async/__mocks__/axios.js里面。

// TODO feedback: jest.mock("axios");和其他的只要是mock一个module,必须在文件级别作用域.
// 也就是不能把这行代码放到describe()，或者test()的作用域
jest.mock("axios");
jest.mock("../verify");
describe("register", () => {
  test("should post user when validated", async () => {
    // arrange
    // act
    // assert
    await expect(register("username", "123leqi123")).resolves.toBe("data");
  });

  test("should reject with Error when username is invalid", async () => {
    // arrange
    // act
    // TODO, 我添加了下面一行代码，因为原本这里没有对verifyUsername()这个方法mock它的返回值，那么原来的这个测试已经是一个集成测试了
    verifyUsername.mockReturnValue(false);
    // assert
    await expect(register("username", "123leqi123")).rejects.toEqual(
      Error("wrong username or password")
    );
  });
});
