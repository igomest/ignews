import { render, screen } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock("next/router", () => {
  // toda vez que esse componente utilizar o next/router, eu vou falar o que ele vai retornar
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("ActiveLinkComponent", () => {
  // a descrição do que está sendo testado
  it("renders correctly", () => {
    render(
      // o render renderiza um componente de forma virtual, para ser visualizada a saída ou o que ele retorna
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("adds active class if the link as currently active", () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toHaveClass("active");
  });
});