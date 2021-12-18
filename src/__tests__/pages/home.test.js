import React from 'react';
import axios from "axios";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockPizza } from "../../__mocks__/db.mock";
import { renderWithRouterMobx } from "../../test-utils";
import Home from "../../pages/home.page";


jest.mock("axios");

describe.skip("Home Page", () => {
	it("should display Loading... text if pizzas haven't loaded yet", () => {
		axios.get.mockResolvedValue({ data: [] });
		
		renderWithRouterMobx(<Home />);
		
		expect(screen.getByText("Все пиццы")).toBeInTheDocument();
		expect(screen.getAllByText("Loading...").length).toBe(12);
	});
	
	it("should add pizzas to cart", async () => {
		axios.get.mockResolvedValue({ data: mockPizza.pizzas });
		
		const { store } = await renderWithRouterMobx(<Home />);
		
		const pizzaBlockIdList = await screen.getAllByTestId("pizza-block");
		
		expect(pizzaBlockIdList.length).toBe(10);
		expect(store.getState().cart.totalCount).toBe(0)
		
		userEvent.click(pizzaBlockIdList[ 0 ].querySelector(".button--add"))
		expect(store.getState().cart.totalCount).toBe(1);
		
		userEvent.click(pizzaBlockIdList[ 0 ].querySelector(".button--add"))
		expect(store.getState().cart.totalCount).toBe(2);
		
		userEvent.click(pizzaBlockIdList[ 1 ].querySelector(".button--add"))
		expect(store.getState().cart.totalCount).toBe(3);
	});
	
	it("should select category", async () => {
		axios.get.mockResolvedValue({ data: mockPizza.pizzas });
		
		const { store } = await renderWithRouterMobx(<Home />);
		
		const categoriesIdList = await screen.getAllByTestId("categories-item");
		
		expect(categoriesIdList[ 0 ]).toHaveTextContent("Все");
		expect(categoriesIdList[ 0 ]).toHaveClass("active");
		
		expect(store.getState().filters.category).toBeNull();

		userEvent.click(categoriesIdList[ 2 ])
		expect(categoriesIdList[ 0 ]).not.toHaveClass("active");
		expect(categoriesIdList[ 2 ]).toHaveClass("active");
		expect(categoriesIdList[ 2 ]).toHaveTextContent("Вегетарианская");
		
		expect(store.getState().filters.category).toBe(1);
	});
	
	it("should select sort-popup item", async () => {
		axios.get.mockResolvedValue({ data: mockPizza.pizzas });
		
		const { store } = await renderWithRouterMobx(<Home />);
		
		expect(screen.queryByTestId("sort-popup")).not.toBeInTheDocument();
		
		userEvent.click(screen.getByTestId("sort-visible"));
		expect(screen.queryByTestId("sort-popup")).toBeInTheDocument();
		
		const sortPopupIdList = await screen.getAllByTestId("sort-popup-item");
		expect(sortPopupIdList[ 0 ]).toHaveTextContent("популярности");
		expect(sortPopupIdList[ 0 ]).toHaveClass("active");
		
		expect(store.getState().filters.sortBy.type).toBe("popular");
		
		userEvent.click(sortPopupIdList[ 1 ]);
		expect(screen.queryByTestId("sort-popup")).not.toBeInTheDocument();
		
		expect(store.getState().filters.sortBy.type).toBe("price");
	});
	
	it("should render ErrorIndicator", async () => {
		axios.get.mockReturnValue(Promise.reject("Error"));
		
		await renderWithRouterMobx(<Home />,{
			initialState: {
				pizzas: {
					error: "Some Text Error"
				}
			}
		});
		
		expect(screen.getByText("Возникла ошибка")).toBeInTheDocument();
		expect(screen.getByText("Some Text Error")).toBeInTheDocument();
	});
});
