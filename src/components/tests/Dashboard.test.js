import {render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import React, {useState} from "react";
import Login from "../auth/login";
import userEvent from "@testing-library/user-event";

export const mockLoginState = () => {
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
}

test("Checks if the 3 components of the dashboard is rendered successfully after login", () => {
	mockLoginState();
	waitFor(async () => {
		await expect(screen.getByText(/Done/i)).toBeInTheDocument();
		await expect(screen.getByText(/Personal/i)).toBeInTheDocument();
		await expect(screen.getByText(/Leaderboard/i)).toBeInTheDocument();
		await expect(screen.getByText(/Stats/i)).toBeInTheDocument();
		await expect(screen.getByText(/Tang/i)).toBeInTheDocument();
	})
})

test("Check if sidebar renders correctly", () => {
	mockLoginState();
	waitFor(async () => {
		await expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
		await expect(screen.getByText(/Schedule/i)).toBeInTheDocument();
		await expect(screen.getByText(/Profile/i)).toBeInTheDocument();
		await expect(screen.getByText(/About/i)).toBeInTheDocument();
	})
})