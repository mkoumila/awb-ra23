import React from "react"
import { Fade, Zoom } from "react-awesome-reveal"

export const Animate = ({
	animationType = "fade",
	direction = "",
	triggerOnce = true,
	cascade = false,
	duration = 1000,
	delay = 0,
	damping = 0.5,
	className = "",
	children,
}) => {
	{
		return animationType == "fade" ? (
			<Fade
				direction={direction}
				triggerOnce={triggerOnce}
				cascade={cascade}
				duration={duration}
				delay={delay}
				className={className}
				damping={damping}
			>
				{children}
			</Fade>
		) : animationType === "zoom" ? (
			<Zoom
				direction={direction}
				triggerOnce={triggerOnce}
				cascade={cascade}
				duration={duration}
				delay={delay}
				className={className}
				damping={damping}
			>
				{children}
			</Zoom>
		) : (
			<div>{children}</div>
		)
	}
}
