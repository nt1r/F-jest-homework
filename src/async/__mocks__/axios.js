export default {
  get: jest.fn().mockImplementation(() =>
    Promise.resolve({
      data: "data",
    })
  ),
  post: jest.fn().mockImplementation(() =>
    Promise.resolve({
      data: "data",
    })
  ),
};
