import React, { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import Login from '../components/auth/login'

test("Checks if dashboard is rendered when user types in correct credientials", async () => {
    const realUseState = useState
    var stubInitialState = ''
    const setUser = jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => realUseState(stubInitialState))
    render(<Login setUser={setUser}/>) 

    const email = screen.getByTestId('email-input')
    const password = screen.getByTestId('password-input')
    userEvent.type(email, "abc@gmail.com")
    userEvent.type(password, "saibong1234")
    userEvent.click(screen.getByTestId("loginsubmit"))

    waitFor(async () => {
        await expect(screen.getByText(/Done/i)).toBeInTheDocument();
    })
})

// test("Checks if user is able to successfully signup with correct credentials", () => {

// }) 