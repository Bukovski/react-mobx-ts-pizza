import React from 'react';
import { render, screen } from "@testing-library/react";
import CartItem from "../../components/сart-item.component";
import { mockCart } from "../../__mocks__/db.mock";
import { countPriceItem } from "../../utils/counters";


describe("CartItem Component", () => {
	it("should render with props", () => {
		const { container } = render(<CartItem
			{ ...mockCart.items[ 2 ] }
			totalCount={ mockCart.items[ 2 ].countItem }
			totalPrice={ countPriceItem(mockCart.items[ 2 ]) }
		/>);
		
		expect(screen.getByText("Пепперони Фреш с перцем")).toBeInTheDocument();
		expect(screen.getByText(/тонкое тесто/)).toBeInTheDocument();
		expect(screen.getByText("1606 ₽")).toBeInTheDocument();
	})
});


