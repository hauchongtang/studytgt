import React, { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import Login from '../components/auth/login'
import SignUp from "../components/auth/signup";

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

test("Checks if failed to sign in is rendered when user types in incorrect credentials", async () => {
    const realUseState = useState
    var stubInitialState = ''
    const setUser = jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => realUseState(stubInitialState))
    render(<Login setUser={setUser}/>)
    
    const email = screen.getByTestId('email-input')
    const password = screen.getByTestId('password-input')
    userEvent.type(email, "abc@gmail.com")
    userEvent.type(password, "saibong12") // deliberate wrong password
    userEvent.click(screen.getByTestId("loginsubmit"))
    
    waitFor(async () => {
        await expect(screen.getByText(/Failed to Log in/i)).toBeInTheDocument();
    })
})

test("Checks if user is able to successfully signup with correct credentials", async () => {
    const realUseState = useState
    var stubInitialState = false
    const setGoSignUp = jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => realUseState(stubInitialState))
    render(<SignUp setGoSignUp={setGoSignUp}/>)
    const firstname = screen.getByTestId('firstname-input');
    const lastname = screen.getByTestId('lastname-input');
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    userEvent.type(firstname, "xxx123" + Math.random());
    userEvent.type(lastname, "test" + Math.random());
    userEvent.type(email, "testing" + Math.random() + "@xyz.com");
    userEvent.type(password, "20394920940923" + Math.random());
    userEvent.click(screen.getByTestId('signup-submit'));
    
    await waitFor(async () => {
        await expect(screen.getByText(/Login/i)).toBeInTheDocument();
    })
})

test("Checks if user fails to signup with duplicate credentials", async () => {
    const realUseState = useState
    var stubInitialState = false
    const setGoSignUp = jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => realUseState(stubInitialState))
    render(<SignUp setGoSignUp={setGoSignUp}/>)
    const firstname = screen.getByTestId('firstname-input');
    const lastname = screen.getByTestId('lastname-input');
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    userEvent.type(firstname, "xxx123" + Math.random());
    userEvent.type(lastname, "test" + Math.random());
    userEvent.type(email, "chicken@gmail.com");
    userEvent.type(password, "20394920940923" + Math.random());
    userEvent.click(screen.getByTestId('signup-submit'));
    
    waitFor(async () => {
        await expect(screen.getByTestId('failed')).toBeInTheDocument();
    })
})