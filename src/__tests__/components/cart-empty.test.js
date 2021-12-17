import React from 'react';
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../../test-utils";
import CartEmpty from "../../components/cart-empty.component";


describe("CartEmpty Component", () => {
	it("should render with Link", () => {
		const { container } = renderWithRouter(<CartEmpty />);
		
		expect(screen.getByText(/Корзина пуста/)).toBeInTheDocument();
		expect(screen.getByText('Вернуться назад').closest('a')).toHaveAttribute('href', '/')
		
		expect(container.firstChild).toMatchSnapshot()
	})
});
