import { extractErrorMessages } from "./errorMessage.js";

const mockJson = {
  errors: [{ message: "Error 1" }, { message: "Error 2" }],
};

const result = extractErrorMessages(mockJson);

describe("extractErrorMessages", () => {
  it("should return an array of error messages with the correct length", () => {
    // Check that the result array has length 2
    expect(result).toHaveLength(2);
  });
  it("should return an array of error messages if errors are present", () => {
    // Check if the result matches the expected array of messages
    expect(result).toEqual(["Error 1", "Error 2"]);
  });

  it("should return an empty array if no errors are present", () => {
    const mockJson = {
      errors: [],
    };

    const result = extractErrorMessages(mockJson);

    // Check if the result is an empty array
    expect(result).toEqual([]);
  });

  it("should return an empty array if there is no errors field", () => {
    const mockJson = {};

    const result = extractErrorMessages(mockJson);

    // Check if the result is an empty array
    expect(result).toEqual([]);
  });

  it("should filter out null or undefined messages", () => {
    const mockJson = {
      errors: [
        { message: "Error 1" },
        { message: null },
        { message: "Error 3" },
      ],
    };

    const result = extractErrorMessages(mockJson);

    // Check if the result filters out null/undefined messages
    expect(result).toEqual(["Error 1", "Error 3"]);
  });
});
