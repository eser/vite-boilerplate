import { render, screen, userEvent } from "../../test-utils.ts";
import { Home } from "./index.page.tsx";

describe('Index', () => {
  it('should be rendered', () => {
    render(
      <Home />
    )
  });
});
