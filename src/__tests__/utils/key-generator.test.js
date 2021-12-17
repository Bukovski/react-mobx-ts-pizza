import { isEqualObjects } from "../../utils/equals";
import { generateKey } from "../../utils/key-generator";


describe("generateKey Utils", () => {
	let realDate = Date;
	
	beforeAll(() => {
		const currentDate = new Date('2021-10-16T11:01:58.135Z');
		global.Date = class extends Date {
			constructor(date) {
				if (date) {
					return super(date);
				}
				
				return currentDate;
			}
		};
	});
	
	afterAll(() => {
		global.Date = realDate;
	});
	
	it("passed the object to the argument", () => {
		const obj1 = {
			"id": 2,
			"name": "Цыпленок барбекю",
			"sizes": [ 26, 40 ],
			"price": 295
		};
		
		const keyGen = generateKey(obj1);
		
		expect(keyGen).toBe('{"id":2,"name":"Цыпленок барбекю","sizes":[26,40],"price":295}_1634382118135')
	});
	
	it("passed null to the argument", () => {
		const keyGen = generateKey(null);
		
		expect(keyGen).toBe('_1634382118135')
	});
	
	it("passed empty to the argument", () => {
		const keyGen = generateKey();
		
		expect(keyGen).toBe('_1634382118135')
	});
});
