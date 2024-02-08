import { useEffect, useState } from "react"
import { useMedia } from "./useMedia"

export const useBreakPoint = (
	mobileBreakPoint = "(min-width: 640px)",
	tabletBreakPoint = "(min-width: 577px)",
	desktopBreakPoint = "(min-width: 1024px)"
) => {
	const [device, setDevice] = useState()

	const isMobile = useMedia(mobileBreakPoint)
	const isTablet = useMedia(tabletBreakPoint)
	const isDesktop = useMedia(desktopBreakPoint)

	useEffect(() => {
		if (isDesktop) {
			setDevice("desktop")
		} else if (isTablet) {
			setDevice("tablet")
		} else {
			setDevice("mobile")
		}
	}, [isMobile, isTablet, isDesktop])
	return device
}
