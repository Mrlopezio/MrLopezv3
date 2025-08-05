/// <reference path="../.astro/types.d.ts" />

// Google Analytics type declarations
declare global {
	interface Window {
		dataLayer: any[]
		gtag: (...args: any[]) => void
	}

	function gtag(...args: any[]): void
	const dataLayer: any[]
}
