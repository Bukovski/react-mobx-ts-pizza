import React from 'react';
import axios from "axios";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockPizza } from "../../__mocks__/db.mock";
import { renderWithRouterMobx, waitXSecond } from "../../test-utils";
import Home from "../../pages/home.page";


jest.mock("axios");

describe("Home Page", () => {
	it("should add pizzas to cart", async () => {
		axios.get.mockResolvedValue({ data: mockPizza.pizzas });
		
		const { store } = renderWithRouterMobx(<Home />);
		
		await waitXSecond(0);
		
		const pizzaBlockIdList = screen.getAllByTestId("pizza-block");

		expect(pizzaBlockIdList.length).toBe(10);
		expect(store.cart.totalCount).toBe(0)

		userEvent.click(pizzaBlockIdList[ 0 ].querySelector(".button--add"))
		expect(store.cart.totalCount).toBe(1);

		userEvent.click(pizzaBlockIdList[ 0 ].querySelector(".button--add"))
		expect(store.cart.totalCount).toBe(2);

		userEvent.click(pizzaBlockIdList[ 1 ].querySelector(".button--add"))
		expect(store.cart.totalCount).toBe(3);
	});
	
	it("should select category", async () => {
		axios.get.mockResolvedValue({ data: mockPizza.pizzas });
		
		const { store } = renderWithRouterMobx(<Home />);
		
		await waitXSecond(0);
		
		const categoriesIdList = screen.getAllByTestId("categories-item");
		
		expect(categoriesIdList[ 0 ]).toHaveTextContent("Все");
		expect(categoriesIdList[ 0 ]).toHaveClass("active");
		
		expect(store.filter.category).toBeNull();

		userEvent.click(categoriesIdList[ 2 ])
		expect(categoriesIdList[ 0 ]).not.toHaveClass("active");
		expect(categoriesIdList[ 2 ]).toHaveClass("active");
		expect(categoriesIdList[ 2 ]).toHaveTextContent("Вегетарианская");
		
		expect(store.filter.category).toBe(1);
	});
	
	it("should select sort-popup item", async () => {
		axios.get.mockResolvedValue({ data: mockPizza.pizzas });
		
		const { store } = renderWithRouterMobx(<Home />);
		
		await waitXSecond(0);
		
		expect(screen.queryByTestId("sort-popup")).not.toBeInTheDocument();
		
		userEvent.click(screen.getByTestId("sort-visible"));
		expect(screen.queryByTestId("sort-popup")).toBeInTheDocument();
		
		const sortPopupIdList = screen.getAllByTestId("sort-popup-item");
		expect(sortPopupIdList[ 0 ]).toHaveTextContent("популярности");
		expect(sortPopupIdList[ 0 ]).toHaveClass("active");
		
		expect(store.filter.sortBy.type).toBe("popular");
		
		userEvent.click(sortPopupIdList[ 1 ]);
		expect(screen.queryByTestId("sort-popup")).not.toBeInTheDocument();
		
		expect(store.filter.sortBy.type).toBe("price");
	});
	
	it("should render ErrorIndicator", async () => {
		axios.get.mockReturnValue(Promise.reject("Error"));
		
		renderWithRouterMobx(<Home />);
		
		await waitXSecond(0);

		expect(screen.getByText("Возникла ошибка")).toBeInTheDocument();
		expect(screen.getByText("Не получилось загрузить данные. Попробуйте позже")).toBeInTheDocument();
	});
});
