import React, { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import Login from "../../auth/login";
import Dashboard from "../../Dashboard";

const mockLoginState = async () => {
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

test("Test if adding task via form will result in a new task in pending tab.", async () => {
	await mockLoginState();
	render(<Dashboard />);
	const taskname = screen.getByTestId('taskname-input');
	const modulecode = screen.getByTestId('modulecode-input');
	const duration = screen.getByTestId('duration-input');
	const addbutton = screen.getByTestId('add-button');
	userEvent.type(taskname, "testing");
	userEvent.type(duration, 0.2);
	userEvent.click(addbutton);
	
	waitFor(async () => {
		await expect(screen.getByText("testing")).toBeInTheDocument();
	})
})

test("Test if clicking on a task card will result in Timer component being loaded", async () => {
	await mockLoginState();
	render(<Dashboard />);
	const taskname = screen.getByTestId('taskname-input');
	const modulecode = screen.getByTestId('modulecode-input');
	const duration = screen.getByTestId('duration-input');
	const addbutton = screen.getByTestId('add-button');
	userEvent.type(taskname, "testing");
	userEvent.type(duration, 0.2);
	userEvent.click(addbutton);
	
	waitFor(async () => {
		await expect(screen.getByText("testing")).toBeInTheDocument();
		userEvent.click(screen.getByTestId('task-element'));
		await expect(screen.getByText(/Start/i)).toBeInTheDocument();
	})
})