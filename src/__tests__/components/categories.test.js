import React from 'react';
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Categories from "../../components/categories.component";
import { categoryNames } from "../../pages/home.page";


describe("Categories Component", () => {
	it("should render with default props", () => {
		const { container } = render(<Categories />);
		
		expect(screen.getByText("Все")).toBeInTheDocument();
		expect(screen.getByText("Все")).toHaveClass("active");
		
		expect(container.firstChild).toHaveClass('categories')
	})
	
	it("should render with props items & active className", () => {
		const activeCategory = 2;
		
		const { container } = render(<Categories
			items={ categoryNames }
			activeCategory={ activeCategory }
		/>);
		
		const listItems = screen.getAllByRole('listitem');
		
		const itemsLength = categoryNames.length + 1;
		expect(listItems.length).toEqual(itemsLength);
		
		listItems.forEach((item, index) => {
			const { getByText } = within(item);
			
			if (index === 0) {
				expect(getByText("Все")).toBeInTheDocument();
				expect(getByText("Все")).not.toHaveClass("active");
				
				return;
			}
			
			const name = categoryNames[ index - 1 ];
			const findTextInElement = getByText(name);
			
			expect(findTextInElement).toBeInTheDocument()
			
			return ((activeCategory + 1) === index)
				? expect(findTextInElement).toHaveClass('active')
				: expect(findTextInElement).not.toHaveClass('active')
		})
		
		userEvent.click(screen.getByText(categoryNames[ 0 ]));
		
		expect(container.firstChild).toMatchSnapshot();
	})
	
	it("click on Category from list Items", () => {
		const mockClickCategory = jest.fn();
		
		render(<Categories
			items={ categoryNames }
			activeCategory={ 3 }
			onClickCategory={	mockClickCategory }
		/>);
		
		expect(mockClickCategory).toBeCalledTimes(0);
		
		userEvent.click(screen.getByText("Все"));
		expect(mockClickCategory).toBeCalledTimes(1);
		expect(mockClickCategory.mock.calls[0][0]).toEqual(null);
		
		userEvent.click(screen.getByText(categoryNames[ 2 ]));
		expect(mockClickCategory).toBeCalledTimes(2);
		expect(mockClickCategory.mock.calls[1][0]).toEqual(2);
		
		userEvent.click(screen.getByText(categoryNames[ 0 ]));
		userEvent.click(screen.getByText(categoryNames[ 3 ]));
		expect(mockClickCategory).toBeCalledTimes(4);
		expect(mockClickCategory.mock.calls[2][0]).toEqual(0);
		expect(mockClickCategory.mock.calls[3][0]).toEqual(3);
	})
});
