import React from 'react';
import { render, screen } from "@testing-library/react";
import CartItem from "../../components/сart-item.component";
import { countPriceItem } from "../../utils/counters";


describe("CartItem Component", () => {
	it("should render with props", () => {
		const mockCart = {
			id: 0,
			name: 'Пепперони Фреш с перцем',
			imageUrl: 'https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg',
			price: 803,
			size: 26,
			type: 'тонкое',
			countItem: 2
		}
		
		render(<CartItem
			{ ...mockCart }
			totalCount={ mockCart.countItem }
			totalPrice={ countPriceItem(mockCart) }
		/>);
		
		expect(screen.getByText("Пепперони Фреш с перцем")).toBeInTheDocument();
		expect(screen.getByText(/тонкое тесто/)).toBeInTheDocument();
		expect(screen.getByText("1606 ₽")).toBeInTheDocument();
	})
});


