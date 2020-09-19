import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { LoginPage } from "../LoginPage";

it("LoginPage renders", async () => {
  const loginComponent = render(<LoginPage />);
  const findUsername = await loginComponent.findByTestId("username");
  const usernameDom = await findUsername.querySelector(
    'input[name="username"]'
  );
  expect(usernameDom).toBeTruthy();

  const passwordEl = await loginComponent.findByTestId("password");
  const passwordInputEl = await passwordEl.querySelector(
    'input[name="password"]'
  );
  expect(passwordInputEl).toBeTruthy();
});

it("LoginPage renders correct username and password values", async () => {
  const loginComponent = render(<LoginPage />);
  const user = await loginComponent.findByTestId("username");
  const userInput = user.querySelector('input[name="username"]');
  fireEvent.change(userInput, {
    target: { value: "pradosh" },
  });
  const password = await loginComponent.findByTestId("password");
  const passwordInput = password.querySelector('input[name="password"]');
  fireEvent.change(passwordInput, {
    target: { value: "password231" },
  });
  fireEvent.blur(passwordInput);

  expect(userInput.value).toEqual("pradosh");
  expect(passwordInput.value).toEqual("password231");
});
