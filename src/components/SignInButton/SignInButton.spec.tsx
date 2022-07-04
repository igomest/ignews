import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useSession } from "next-auth/react";
import { SignInButton } from ".";

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

describe("SignInButton component", () => {
  // a descrição do que está sendo testado
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = jest.fn(useSession);

    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

    render(
      // o render renderiza um componente de forma virtual, para ser visualizada a saída ou o que ele retorna
      <SignInButton />
    );

    expect(screen.getByText("Sign in with GitHub")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = jest.fn(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        name: "Jhon Doe",
        email: "jhon.doe@example.com",
        expires: "fake-expires",
      },
      status: "authenticated",
    });

    render(
      // o render renderiza um componente de forma virtual, para ser visualizada a saída ou o que ele retorna
      <SignInButton />
    );

    expect(screen.getByText("Jhon Doe")).toBeInTheDocument();
  });
});
