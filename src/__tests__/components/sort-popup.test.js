import React from 'react';
import { act, render, screen } from "@testing-library/react";
import SortPopup from "../../components/sort-popup.component";
import { sortItems } from "../../pages/home.page";
import userEvent from "@testing-library/user-event";


describe("SortPopup Component", () => {
	it("should render, open sort popup & select one", () => {
		const mockClickSortType = jest.fn();
		
		const { container } = render(
			<SortPopup
				items={ sortItems }
				activeSortType={ sortItems[ 1 ].type }
				onClickSortType={ mockClickSortType }
			/>
		);
		
		expect(mockClickSortType).toBeCalledTimes(0);
		expect(screen.queryByTestId("sort-popup")).not.toBeInTheDocument();
		
		expect(screen.getByText("цене").closest('div')).toHaveClass('sort__label');
		
		userEvent.click(screen.getByTestId("sort-visible"));
		expect(screen.queryByTestId("sort-popup")).toBeInTheDocument();
		
		expect(container.firstChild).toMatchSnapshot()
		
		userEvent.click(screen.getByText("популярности"));
		expect(screen.queryByTestId("sort-popup")).not.toBeInTheDocument();
		expect(mockClickSortType).toBeCalledTimes(1);
		
		userEvent.click(screen.getByTestId("sort-visible"));
		expect(screen.queryByTestId("sort-popup")).toBeInTheDocument();
		
		act(() => {
			userEvent.click(document.body);
		});
		expect(screen.queryByTestId("sort-popup")).not.toBeInTheDocument();
	})
	
	it("render without onClickSortType open sort popup & select one", () => {
		render(
			<SortPopup
				items={ sortItems }
				activeSortType={ sortItems[ 1 ].type }
			/>
		);
		
		expect(screen.queryByTestId("sort-popup")).not.toBeInTheDocument();
		
		userEvent.click(screen.getByTestId("sort-visible"));
		expect(screen.queryByTestId("sort-popup")).toBeInTheDocument();
		
		userEvent.click(screen.getByText("популярности"));
		expect(screen.queryByTestId("sort-popup")).not.toBeInTheDocument();
	})
});
