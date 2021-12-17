import React from 'react';
import { screen, render } from "@testing-library/react";
import { ErrorFallback, ErrorIndicator } from "../../components/error-indicator.component";


describe("ErrorIndicator Component", () => {
	it("ErrorIndicator should render", () => {
		const { container } = render(
			<ErrorIndicator>
				{ "Error text" }
			</ErrorIndicator>
		);
		
		expect(screen.getByText("Error text")).toBeInTheDocument();
		expect(container.firstChild).toHaveClass("error");
		
		expect(container.firstChild).toMatchSnapshot()
	})
	
	it("ErrorFallback should render", () => {
		const mockErrorFn = jest.fn();
		const saveConsoleError = console.error;
		
		console.error = mockErrorFn;
		
		render(<ErrorFallback />);
		
		expect(screen.getByText("Что-то пошло не так, но мы скоро все починим")).toBeInTheDocument();
		
		expect(mockErrorFn).toBeCalled();
		
		console.error = saveConsoleError;
	})
	
});
