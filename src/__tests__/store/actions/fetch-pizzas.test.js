import axios from "axios";
import { mockPizza, mockSortingPopular, mockSortingPrice } from "../../../__mocks__/db.mock";
import { fetchPizzas } from "../../../store/actions-async/fetch-pizzas";
import { store } from "../../../store";


jest.mock("axios");

describe("fetchPizzas Action", () => {
	it('request sort=popular&_order=desc', async () => {
		axios.get.mockResolvedValue({ data: mockPizza.pizzas });
		
		const request = await fetchPizzas({ type: 'popular', order: 'desc' }, null)(store.dispatch)
		
		await expect(axios.get).toHaveBeenCalledWith(
			"/db/pizzas?&_sort=popular&_order=desc"
		)
		
		expect(request.type).toBe("SET_PIZZAS")
		expect(request.payload).toHaveLength(10)
	});
	
	it('request category=1&_sort=popular&_order=desc', async () => {
		axios.get.mockResolvedValue({ data: mockSortingPopular });
		
		const request = await fetchPizzas({ type: 'popular', order: 'desc' }, 1)(store.dispatch)
		
		await expect(axios.get).toHaveBeenCalledWith(
			"/db/pizzas?category=1&_sort=popular&_order=desc"
		)

		expect(request.type).toBe("SET_PIZZAS");
		expect(request.payload).toHaveLength(3);
		expect(request.payload).toMatchObject([
			{ id: 1, category: 1 },
			{ id: 2, category: 1 },
			{ id: 6, category: 1 }
		]);
	});
	
	it('request category=1&_sort=name&_order=asc', async () => {
		axios.get.mockResolvedValue({ data: mockSortingPrice });
		
		const request = await fetchPizzas({ type: 'name', order: 'asc' }, 1)(store.dispatch)
		
		await expect(axios.get).toHaveBeenCalledWith(
			"/db/pizzas?category=1&_sort=name&_order=asc"
		)
		
		expect(request.type).toBe("SET_PIZZAS");
		expect(request.payload).toHaveLength(3);
		expect(request.payload).toMatchObject([
			{ id: 6, category: 1 },
			{ id: 2, category: 1 },
			{ id: 1, category: 1 }
		]);
	});
	
	it('request failure', async () => {
		axios.get.mockReturnValue(Promise.reject("Error"));
		
		const request = await fetchPizzas({ type: '', order: '' }, null)(store.dispatch)
		
		expect(request.type).toBe("FAILURE_LOADED");
		expect(request.payload).toBe("Не получилось загрузить данные. Попробуйте позже");
	});
})
