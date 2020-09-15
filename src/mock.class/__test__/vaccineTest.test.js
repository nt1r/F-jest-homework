import VaccineTest from "../vaccineTest";
import Recipient from "../recipient";
import Covid19Vaccine from "../covid19Vaccine";

let mockHasAntibodies = true;
const mockAcceptInjection = jest.fn();
const mockGetHasAntibodies = jest
  .fn()
  .mockImplementation(() => mockHasAntibodies);

jest.mock("../recipient", () => {
  // mock class实现
  return jest.fn().mockImplementation(() => {
    return {
      acceptInjection: mockAcceptInjection,
      getHasAntibodies: mockGetHasAntibodies,
      hasAntibodies: mockHasAntibodies,
    };
  });
});

beforeEach(() => {
  // clear mock here
  Recipient.mockClear();
  mockAcceptInjection.mockClear();
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
    mockHasAntibodies = true;
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
    mockHasAntibodies = false;
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
