import React from 'react';
import { render, screen } from "@testing-library/react";
import FormOrderPopup, { normalizeInput } from "../../components/from-order-popup.component";
import userEvent from "@testing-library/user-event";


describe("FormOrderPopup Component", () => {
	describe("FormOrderPopup", () => {
		it("form not visible", () => {
			const { container } = render(<FormOrderPopup
				isVisibleForm={ false }
			/>);
			
			expect(container.firstChild).toHaveClass("form-order");
			expect(container.firstChild).toHaveClass("form-order__hide");
			
			expect(container.firstChild).toMatchSnapshot()
		})
		
		it("change input value & get phone mask value", () => {
			const { container } = render(<FormOrderPopup
				isVisibleForm={ true }
			/>);
			
			expect(container.firstChild).not.toHaveClass("form-order__hide");
			
			const textbox = screen.getByRole("textbox");
			
			userEvent.type(textbox, "5556667777");
			expect(textbox).toHaveValue("(555) 666-7777");
		})
		
		it("close window & send form order", () => {
			const mockVisibleForm = jest.fn();
			const mockPhoneOrder = jest.fn();
			
			const { container } = render(<FormOrderPopup
				isVisibleForm={ true }
				onVisibleForm={ mockVisibleForm }
				setPhoneOrder={ mockPhoneOrder }
			/>);
			
			expect(container.firstChild).not.toHaveClass("form-order__hide");
			
			expect(mockVisibleForm).toBeCalledTimes(0);
			expect(mockPhoneOrder).toBeCalledTimes(0);
			
			const closeWindowId = screen.getByTestId('close-window-button');
			const textbox = screen.getByRole("textbox");
			
			userEvent.type(textbox, "5556667777");
			expect(textbox).toHaveValue("(555) 666-7777");
			
			userEvent.click(closeWindowId);
			expect(mockVisibleForm).toBeCalledTimes(1);
			expect(textbox).toHaveValue("(555) 666-7777");
			
			userEvent.click(screen.getByText('Отправить'));
			expect(mockVisibleForm).toBeCalledTimes(2);
			expect(mockPhoneOrder).toBeCalledTimes(1);
			expect(textbox).toHaveValue("");
		})
		
		it("reset form order & get error message", () => {
			const mockVisibleForm = jest.fn();
			const mockPhoneOrder = jest.fn();
			
			render(<FormOrderPopup
				isVisibleForm={ true }
				onVisibleForm={ mockVisibleForm }
				setPhoneOrder={ mockPhoneOrder }
			/>);
			
			const textbox = screen.getByRole("textbox");
			
			userEvent.type(textbox, "5556667777");
			expect(textbox).toHaveValue("(555) 666-7777");
			
			userEvent.click(screen.getByText('Сбросить'));
			expect(textbox).toHaveValue("");
			
			const errorMessage = screen.getByTestId('error-message-window')
			
			userEvent.click(screen.getByText('Отправить'));
			expect(errorMessage).toHaveClass("form-order--error");
			expect(errorMessage).toHaveTextContent("Введите свой телефон");
			
			userEvent.type(textbox, "555666");
			userEvent.click(screen.getByText('Отправить'));
			expect(errorMessage).toHaveTextContent("Не верный формат ввода: (555) 555-5555");
		})
	})
	
	describe("normalizeInput", () => {
		it("all params is number", () => {
			const normalize = normalizeInput(5556667777, 5556668888)
			
			expect(normalize).toBe(5556667777);
			expect(typeof normalize).toBe("number")
		})
		
		it("first and second params have same length", () => {
			const normalize = normalizeInput("5556667777", "5556668888")
			
			expect(normalize).toBe("5556667777");
			expect(typeof normalize).toBe("string")
		})
		
		it("first and second params have different lengths", () => {
			const normalize = normalizeInput("5556667777", "555666888")
			
			expect(normalize).toBe("(555) 666-7777");
		})
	})
});
