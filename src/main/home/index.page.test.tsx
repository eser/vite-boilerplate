import { render, screen } from "@testing-library/react";
import { Home } from "./index.page.tsx";

describe("Index", () => {
  it("should be rendered", () => {
    render(
      <Home />,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
