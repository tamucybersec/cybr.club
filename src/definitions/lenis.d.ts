// types/lenis.d.ts or globals.d.ts
declare module "lenis" {
	type LenisOptions = {
		duration?: number;
		easing?: (t: number) => number;
		smoothWheel?: boolean;
		syncTouch?: boolean;
		touchMultiplier?: number;
		// ...add others as needed
	};

	class Lenis {
		constructor(options?: LenisOptions);
		raf(time: number): void;
		scrollTo(position: number, options?: { immediate?: boolean }): void;
		destroy(): void;
	}

	export default Lenis;
}
