import {render,screen, waitFor} from "@testing-library/react";
import Planner from "../planner";
import userEvent from "@testing-library/user-event";

test("Test if planner renders when import link is added", async () => {
	render(<Planner/>)
	const addLinkField = screen.getByTestId('import-input');
	const submitButton = screen.getByTestId('submit-button');
	userEvent.type(addLinkField,
		"https://nusmods.com/timetable/sem-1/share?CS2102=LEC:1,TUT:05&CS2103T=LEC:G16&CS2105=TUT:06,LEC:1&FSC2101=LEC:1&ST2334=LEC:1,TUT:10");
	userEvent.click(submitButton);
	
	waitFor(async () => {
		await expect(screen.getByText(/TUT [06]/i)).toBeInTheDocument();
	})
})