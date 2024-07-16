export class Delay {
	constructor(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
