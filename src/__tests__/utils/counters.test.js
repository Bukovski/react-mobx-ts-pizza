import { getTotalCount } from "../../utils/counters";


describe("getTotalCount Utils", () => {
	it("if objects have countItem", () => {
		const dataWithObjects = [
			{
				id: 2,
				name: 'Цыпленок барбекю',
				imageUrl: 'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/6652fec1-04df-49d8-8744-232f1032c44b.jpg',
				price: 295,
				size: 26,
				type: 'тонкое',
				countItem: 1
			},
			{
				id: 1,
				name: 'Сырная',
				imageUrl: 'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg',
				price: 245,
				size: 26,
				type: 'тонкое',
				countItem: 3
			}
		];
		
		const totalCount = getTotalCount(dataWithObjects);
		
		expect(totalCount).toBe(4)
	})
	
	it("if each object do not have countItem", () => {
		const dataWithObjects = [
			{
				id: 2,
				name: 'Цыпленок барбекю',
				imageUrl: 'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/6652fec1-04df-49d8-8744-232f1032c44b.jpg',
				price: 295,
				size: 26,
				type: 'тонкое'
			},
			{
				id: 1,
				name: 'Сырная',
				imageUrl: 'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg',
				price: 245,
				size: 26,
				type: 'тонкое',
				countItem: 3
			}
		];
		
		const totalCount = getTotalCount(dataWithObjects);
		
		expect(totalCount).toBe(3)
	})
});
