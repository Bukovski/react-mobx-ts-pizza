import React from 'react';
import { render, screen } from "@testing-library/react";
import PizzaBlock from "../../components/pizza-block.component";
import { mockPizza } from "../../__mocks__/db.mock";
import userEvent from "@testing-library/user-event";


describe("PizzaBlock Component", () => {
	it("should render with defaultProps", () => {
		const { container } = render(<PizzaBlock />);
		
		expect(screen.getByText("---")).toHaveClass("pizza-block__title");
		expect(screen.getByText("тонкое")).toHaveClass("disabled");
		expect(screen.getByText("традиционное")).toHaveClass("disabled");
		expect(screen.getByText("от 0 ₽")).toHaveClass("pizza-block__price");

		expect(container.firstChild).toMatchSnapshot()
	});
	
	it("should render with props", () => {
		render(<PizzaBlock
			{ ...mockPizza.pizzas[ 1 ] }
			addedCount={ 3 }
		/>);
		
		expect(screen.getByText("Сырная")).toHaveClass("pizza-block__title");
		
		expect(screen.getByText("тонкое")).toHaveClass("active");
		expect(screen.getByText("традиционное")).toHaveClass("disabled");
		
		expect(screen.getByText("26 см.").closest('li')).toHaveClass("active");
		expect(screen.getByText("30 см.").closest('li')).toHaveClass("disabled");
		
		expect(screen.getByText("от 245 ₽")).toHaveClass("pizza-block__price");
		
		expect(screen.getByText(3).closest('button')).toBeInTheDocument();
	});
	
	it("should call onClickAddPizza function if click button", () => {
		const mockClickAddPizza = jest.fn();
		
		render(<PizzaBlock
			{ ...mockPizza.pizzas[ 1 ] }
			addedCount={ 3 }
			onClickAddPizza={ mockClickAddPizza }
		/>);
		
		expect(screen.getByText("Сырная")).toHaveClass("pizza-block__title");
		
		expect(mockClickAddPizza).toBeCalledTimes(0);
		
		userEvent.click(screen.getByRole("button"))
		expect(mockClickAddPizza).toBeCalledTimes(1);
	});
	
	it("should select size & types", () => {
		const mockClickAddPizza = jest.fn();
		
		render(<PizzaBlock
			{ ...mockPizza.pizzas[ 0 ] }
			addedCount={ 3 }
			onClickAddPizza={ mockClickAddPizza }
		/>);
		
		expect(screen.getByText("тонкое")).toHaveClass("active");
		expect(screen.getByText("традиционное")).not.toHaveClass("active");

		userEvent.click(screen.getByText("традиционное"))
		expect(screen.getByText("тонкое")).not.toHaveClass("active");
		expect(screen.getByText("традиционное")).toHaveClass("active");
		
		
		expect(screen.getByText("26 см.").closest('li')).toHaveClass("active");
		expect(screen.getByText("30 см.").closest('li')).not.toHaveClass("active");
		
		userEvent.click(screen.getByText("30 см."))
		expect(screen.getByText("26 см.").closest('li')).not.toHaveClass("active");
		expect(screen.getByText("30 см.").closest('li')).toHaveClass("active");
		
		expect(mockClickAddPizza).toBeCalledTimes(0);
	});
});
