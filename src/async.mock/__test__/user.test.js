import { register } from "../user";

describe("register", () => {
  test("should post user when validated", async () => {
    // arrange
    jest.mock("axios");
    // act
    // assert
    await expect(register("username", "123leqi123")).resolves.toBe("data");
  });

  test("should reject with Error when username is invalid", async () => {
    // arrange
    jest.mock("axios");
    // act
    // assert
    await expect(register("username", "password")).rejects.toEqual(
      Error("wrong username or password")
    );
  });
});
