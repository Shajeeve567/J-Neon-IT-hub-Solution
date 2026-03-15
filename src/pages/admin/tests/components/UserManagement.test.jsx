// src/pages/admin/tests/components/AdminUsers.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import AdminUsers from "../../UserManagement"; // make sure this path is correct

// Mock global fetch (only needed for add user tests)
beforeEach(() => {
  vi.restoreAllMocks();
  global.fetch = vi.fn((url, options) => {
    // POST create user
    if (url.endsWith("/admin/create") && options.method === "POST") {
      const body = JSON.parse(options.body);
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 3, email: body.email }),
      });
    }

    return Promise.reject(`Unknown fetch call: ${url}`);
  });
});

describe("AdminUsers Component", () => {
  it("renders Add Admin button", () => {
    render(<AdminUsers />);
    expect(screen.getByText("Add Admin")).toBeInTheDocument();
  });

  it("shows error when adding user with empty email", async () => {
    render(<AdminUsers />);
    fireEvent.click(screen.getByText("Add Admin"));

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
  });

  it("shows error when adding user with invalid email", async () => {
    render(<AdminUsers />);
    const input = screen.getByPlaceholderText("Admin Email");
    fireEvent.change(input, { target: { value: "invalidemail" } });
    fireEvent.click(screen.getByText("Add Admin"));

    expect(await screen.findByText("Please enter a valid email address")).toBeInTheDocument();
  });

  it("can add a valid user", async () => {
    render(<AdminUsers />);
    const input = screen.getByPlaceholderText("Admin Email");
    fireEvent.change(input, { target: { value: "charlie@example.com" } });
    fireEvent.click(screen.getByText("Add Admin"));

    // Verify fetch call
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/admin/create",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
  });
});