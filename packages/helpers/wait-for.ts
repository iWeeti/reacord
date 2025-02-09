import { setTimeout } from "node:timers/promises"
import { MaybePromise } from "./types.ts"

const maxTime = 1000

export async function waitFor<Result>(
	predicate: () => MaybePromise<Result>,
): Promise<Awaited<Result>> {
	const startTime = Date.now()
	let lastError: unknown

	while (Date.now() - startTime < maxTime) {
		try {
			return await predicate()
		} catch (error) {
			lastError = error
			await setTimeout(50)
		}
	}

	throw lastError ?? new Error("Timeout")
}
