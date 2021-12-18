import React from 'react';
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "mobx-react";
import { render } from "@testing-library/react";
import { rootStore } from "./store";
import { configure } from "mobx";

configure({
	enforceActions: "never",
})

export const renderWithRouter = (component) => {
	const history = createMemoryHistory();
	
	return {
		...render (
			<Router history={ history }>
				{ component }
			</Router>
		)
	}
}

export const renderWithRouterMobx = (component,	{ store } = { store: rootStore }) => {
	const history = createMemoryHistory();
	
	return {
		...render(
			<Router history={ history }>
				<Provider { ...store }>
					{ component }
				</Provider>
			</Router>
		),
		store
	}
}
