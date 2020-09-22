import VaccineTest from "../vaccineTest";
import Recipient from "../recipient";
import Covid19Vaccine from "../covid19Vaccine";

const mockAcceptInjection = jest.fn();
const mockGetHasAntibodies = jest.fn();

jest.mock("../recipient", () => {
  // mock class实现
  return jest.fn().mockImplementation(() => {
    return {
      acceptInjection: mockAcceptInjection,
      getHasAntibodies: mockGetHasAntibodies,
      // TODO 我们已经mock了使用hasAntibodies的方法getHasAntibodies()。
      // 那就不需要，也不应该在去mock这个class上面的field了

      // hasAntibodies: mockHasAntibodies,
    };
  });
});

beforeEach(() => {
  // clear mock here
  Recipient.mockClear();
  mockAcceptInjection.mockClear();
  // TODO feedback: 在describe("test"，）里面，有2个测试，且都会用到mockGetHasAntibodies。
  // 我们需要在下面这行代码来清楚前面的测试跑过之后对后面测试的影响。
  mockGetHasAntibodies.mockReset();
});

describe("inject", () => {
  test("should recipient accept injection with vaccine", () => {
    // assign
    const vaccineTest = new VaccineTest();
    // act
    vaccineTest.inject();
    // assert
    expect(mockAcceptInjection).toHaveBeenCalled();
    expect(mockAcceptInjection).toHaveBeenCalledTimes(1);
    expect(mockAcceptInjection).toHaveBeenCalledWith(
      expect.any(Covid19Vaccine)
    );
  });
});

describe("test", () => {
  test("should get Success if recipient has antibodies", () => {
    // assign
    const vaccineTest = new VaccineTest();
    // mockHasAntibodies = true;
    // TODO 我们应该去mock这个class的function,而不是去mock这个class的field
    mockGetHasAntibodies.mockImplementation(() => true);
    // act
    const actual = vaccineTest.test();
    // assert
    expect(mockGetHasAntibodies).toHaveBeenCalled();
    expect(mockGetHasAntibodies).toHaveBeenCalledTimes(1);
    expect(mockGetHasAntibodies).toHaveReturned();
    expect(mockGetHasAntibodies).toHaveReturnedTimes(1);
    expect(mockGetHasAntibodies).toHaveReturnedWith(true);

    expect(actual).toEqual("Vaccine Test Success");
  });

  test("should get Failed if recipient has no antibodies", () => {
    // assign
    const vaccineTest = new VaccineTest();
    // mockHasAntibodies = false;
    // TODO 我们应该去mock这个class的function,而不是去mock这个class的field
    mockGetHasAntibodies.mockImplementation(() => false);
    // act
    const actual = vaccineTest.test();
    // assert
    expect(mockGetHasAntibodies).toHaveBeenCalled();
    expect(mockGetHasAntibodies).toHaveBeenCalledTimes(1);
    expect(mockGetHasAntibodies).toHaveReturned();
    expect(mockGetHasAntibodies).toHaveReturnedTimes(1);
    expect(mockGetHasAntibodies).toHaveReturnedWith(false);

    expect(actual).toEqual("Vaccine Test Failed");
  });
});
