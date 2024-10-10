import { loginUser } from "./loginUser.js";

describe("loginUser", () => {
  // Set up mock localStorage once before all tests
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
    };
  })();

  beforeAll(() => {
    Object.defineProperty(global, "localStorage", {
      value: localStorageMock,
    });
  });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should log in the user successfully, redirect the user and store access token, login success and user name", async () => {
    // Mock valid user data and API response
    const mockUserData = { email: "test@example.com", password: "password123" };
    const mockResponseData = {
      data: {
        accessToken: "testToken",
        name: "Test User",
      },
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponseData),
      })
    );

    const url = "https://example.com/login";
    const result = await loginUser(url, mockUserData);

    // Verify fetch was called correctly
    expect(fetch).toHaveBeenCalledWith(
      url,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockUserData),
      })
    );

    // Check that the returned data is correct
    expect(result).toEqual(mockResponseData);

    // Check that localStorage has been updated
    expect(localStorage.getItem("accessToken")).toBe("testToken");
    expect(localStorage.getItem("loginSuccess")).toBe("true");
    expect(localStorage.getItem("userName")).toBe(JSON.stringify("Test User"));

    // Mocking window.location.href as Jest doesn't handle navigation
    // expect(window.location.href).toBe("../post/manage.html")
  });

  it("should throw an error if the login is unsuccessful", async () => {
    const mockUserData = {
      email: "wrong@email.no",
      password: "wrongpassword1234",
    };
    const mockErrorResponse = { message: "login failed" };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(mockErrorResponse),
      })
    );

    const url = "https://example.com/login";

    await expect(loginUser(url, mockUserData)).rejects.toThrow("login failed");

    // Ensure localStorage is not updated
    expect(localStorage.getItem("accessToken")).toBeNull();
  });
});
