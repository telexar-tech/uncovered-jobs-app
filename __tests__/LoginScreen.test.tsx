
import { NavigationContainer } from "@react-navigation/native";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import LoginScreen from "../screens/LoginScreen";

describe("LoginScreen", () => {
  it("renders correctly", () => {
    render(
      <PaperProvider>
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </PaperProvider>
    );

    expect(screen.getByText("Let's Login")).toBeTruthy();
    expect(screen.getByTestId("email-input")).toBeTruthy();
    expect(screen.getByTestId("password-input")).toBeTruthy();
    expect(screen.getByText("Continue")).toBeTruthy();
  });

  it("shows validation errors for empty fields", async () => {
    render(
      <PaperProvider>
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </PaperProvider>
    );

    fireEvent.press(screen.getByText("Continue"));

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeTruthy();
      expect(screen.getByText("Password is required")).toBeTruthy();
    });
  });

  it("shows validation error for invalid email", async () => {
    render(
      <PaperProvider>
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </PaperProvider>
    );

    fireEvent.changeText(screen.getByTestId("email-input"), "invalid-email");
    fireEvent.press(screen.getByText("Continue"));

    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeTruthy();
    });
  });

  it("handles successful login", async () => {
    const consoleSpy = jest.spyOn(console, "log");
    render(
      <PaperProvider>
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </PaperProvider>
    );

    fireEvent.changeText(screen.getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(screen.getByTestId("password-input"), "password123");
    fireEvent.press(screen.getByText("Continue"));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });

    consoleSpy.mockRestore();
  });
});
