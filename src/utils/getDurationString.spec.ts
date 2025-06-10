import { getDurationString } from "./getDurationString";

describe("getDurationString", () => {
  // Mock current date to June 10, 2025 for "Present" tests
  const MOCK_NOW = new Date(2025, 5, 10).getTime();
  let dateNowSpy: jest.SpyInstance;

  beforeAll(() => {
    dateNowSpy = jest.spyOn(Date, "now").mockImplementation(() => MOCK_NOW);
  });

  afterAll(() => {
    dateNowSpy.mockRestore();
  });

  it("returns 'Less than a month' for same month", () => {
    expect(getDurationString("Jun 2025", "Jun 2025")).toBe("Less than a month");
  });

  it("returns months only", () => {
    expect(getDurationString("Jan 2025", "Apr 2025")).toBe("3 months");
  });

  it("returns years only", () => {
    expect(getDurationString("Jun 2020", "Jun 2025")).toBe("5 years");
  });

  it("returns years and months", () => {
    expect(getDurationString("Jan 2020", "Apr 2025")).toBe(
      "5 years and 3 months"
    );
  });

  it("handles 'Present' as end date", () => {
    expect(getDurationString("Aug 2024", "Present")).toBe("10 months");
    expect(getDurationString("Jul 2022", "Present")).toBe(
      "2 years and 11 months"
    );
  });

  it("handles 'Sept' and 'Sep' abbreviations", () => {
    expect(getDurationString("Sept 2021", "Oct 2022")).toBe(
      "1 year and 1 month"
    );
    expect(getDurationString("Sep 2021", "Oct 2022")).toBe(
      "1 year and 1 month"
    );
  });

  it("handles invalid month gracefully", () => {
    expect(getDurationString("Foo 2021", "Jun 2022")).toBe(
      "1 year and 5 months"
    );
  });
});
