import React from 'react';
import { screen, render } from "@testing-library/react";
import Button from "../../components/button.component";
import userEvent from "@testing-library/user-event";


describe("Button Component", () => {
	let childrenText,
		mockClickFn;
	
	beforeEach(() => {
		childrenText = <span>Button text</span>;
		mockClickFn = jest.fn();
	});
	
	it("should render with children and spy on click", () => {
		const { container } = render(
			<Button
				onClick={ mockClickFn }
			>
				{ childrenText }
			</Button>
		);
		
		expect(screen.getByText("Button text")).toBeInTheDocument();
		
		expect(mockClickFn).not.toBeCalled();
		
		userEvent.click(screen.getByRole("button"));
		expect(mockClickFn).toBeCalled();
		
		expect(container.firstChild).toMatchSnapshot()
	})
	
	it("should render with custom className & outline", () => {
		const { container } = render(
			<Button
				onClick={ mockClickFn }
				className="form-order--primary"
				outline
			>
				{ childrenText }
			</Button>
		);
		
		const buttonVar = screen.getByRole("button");
		
		expect(buttonVar).toHaveClass("form-order--primary");
		expect(buttonVar).toHaveClass("button--outline");
		
		expect(container.firstChild).toMatchSnapshot()
	})
});
