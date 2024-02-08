import { useEffect, useState } from "react"

export const isBrowser = typeof window !== "undefined"

const getInitialState = (query, defaultState) => {
	// Prevent a React hydration mismatch when a default value is provided by not defaulting to window.matchMedia(query).matches.
	if (defaultState !== undefined) {
		return defaultState
	}

	if (isBrowser) {
		return window.matchMedia(query).matches
	}

	return false
}

export const useMedia = (query, defaultState) => {
	const [state, setState] = useState(getInitialState(query, defaultState))

	useEffect(() => {
		let mounted = true
		const mql = window.matchMedia(query)
		const onChange = () => {
			if (!mounted) {
				return
			}
			setState(!!mql.matches)
		}

		mql.addListener(onChange)
		setState(mql.matches)

		return () => {
			mounted = false
			mql.removeListener(onChange)
		}
	}, [query])

	return state
}
