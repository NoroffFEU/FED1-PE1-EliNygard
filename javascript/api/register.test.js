import { registerUser } from "./register";

// Mock functions to handle fetch, localStorage, and window location
global.fetch = jest.fn();
global.localStorage = {
  setItem: jest.fn(),
};
global.window = {
  location: {
    href: "",
  },
};

const url = "https://example.com/register";
const userData = {
  userName: "testUser",
  email: "test@test.no",
  password: "password123",
};
const confirmPassword = "password123";

describe("registerUser", () => {
  afterEach(() => {
    jest.clearAllMocks(); // clear any mocks after each test
  });

  it("should register the user successfully and redirect to login page", async () => {

    // Mock the successful fetch response
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ success: true }),
    };
    fetch.mockResolvedValue(mockResponse);

    // Call the function
    const result = await registerUser(url, userData, confirmPassword);

    // Assert fetch was called with correct data
    expect(fetch).toHaveBeenCalledWith(url, {
      method: "post",
      headers: { "Content-Type": "application(json" },
      body: JSON.stringify(userData),
    });

    // Assert localStorage and redirect were called correctly
    expect(localStorage.setItem).toHaveBeenCalledWith("registerSuccess", true);
    expect(window.location.href).toBe("../account/login.html");

    // Assert the returned result
    expect(result).toEqual({ success: true });
  });

  it("should handle a registration error and not redirect", async () => {

    // Mock the failed fetch response
    const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({ error: "Invalid data" }),
    }
    fetch.mockResolvedValue(mockResponse)

    // Mock the error handling functions
    // const mockExtractErrorMessages = jest.fn()
    // const mockRenderErrorMessageHtml = jest.fn()

    // Call the function and assert fetch was called
    await registerUser(url, userData, confirmPassword)
    expect(fetch).toHaveBeenCalledWith(url, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userData)
    })

    // Assert localStorage and redirect were not called
    expect(localStorage.setItem).not.toHaveBeenCalled()
    expect(window.location.href).toBe("")
  });
});
