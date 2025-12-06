import { handler } from "../services/hello";

describe("Hello describe test suite", () => {
  test("Handler test return 200", async () => {
    // Call main method
    const result = await handler({} as any, {} as any);

    // Assertion, the fetch method will call once
    expect(result.statusCode).toBe(200);
  });
});
