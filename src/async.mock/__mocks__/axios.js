export default {
  post: jest.fn().mockImplementation(() =>
    Promise.resolve({
      data: "data",
    })
  ),
};
