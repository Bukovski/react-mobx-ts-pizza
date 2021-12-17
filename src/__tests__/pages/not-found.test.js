import React from 'react';
import { render } from "@testing-library/react";
import NotFound from "../../pages/not-found.page";


describe("NotFound Page", () => {
	it("should render", () => {
		const { container } = render(<NotFound />);
		
		expect(container.firstChild).toHaveClass("main");
		
		expect(container.firstChild).toMatchSnapshot()
	})
});
