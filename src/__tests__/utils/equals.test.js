import { isEqualObjects } from "../../utils/equals";


describe("isEqualObjects Utils", () => {
	it("if objects have different length", () => {
		const obj1 = {
			"id": 2,
			"imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/6652fec1-04df-49d8-8744-232f1032c44b.jpg",
			"name": "Цыпленок барбекю",
			"types": [ 0 ],
			"sizes": [ 26, 40 ],
			"price": 295,
			"category": 1,
			"rating": 4
		};
		
		const obj2 = {
			"id": 1,
			"imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg",
			"name": "Сырная",
			"types": [ 0 ],
			"sizes": [ 26, 40 ],
			"price": 245,
		};
		
		const equalObjects = isEqualObjects(obj1, obj2);
		
		expect(equalObjects).toBeFalsy();
	})
});
