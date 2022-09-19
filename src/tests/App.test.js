import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import App from '../App'

test("Checks if the Login page is rendered for non-signed in users", () => {
    render(<App/>);
    const headerElement = screen.getByText(/Sign Up/i);
    expect(headerElement).toBeInTheDocument();
})

test("checks if dashboard is rendered for signed in users", () => {
    localStorage.setItem("timetable", "https://nusmods.com/timetable/sem-1/share?CS2102=LEC:1V,TUT:05&CS2103T=LEC:G19&FSC2101=LEC:1&ST2334=LEC:1,TUT:3")
    localStorage.setItem("user", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IiIsIkZpcnN0X25hbWUiOiIiLCJMYXN0X25hbWUiOiIiLCJVaWQiOiIiLCJVc2VyX3R5cGUiOiIiLCJleHAiOjE2NjQxNTc1Njh9.AhqX8X-GCVL1cqmO7Y_buTOa3IumaGjB4OXpazGFGJE")
    render(<App/>)
    expect(screen.getByText(/Done/i)).toBeInTheDocument();
})