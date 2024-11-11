'use client'

import { useEffect, useState } from 'react'

const CountdownTimer = ({ endDate }: { endDate: string }) => {
	const [timeLeft, setTimeLeft] = useState('')

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date().getTime()
			const end = new Date(endDate).getTime()
			const distance = end - now

			if (distance < 0) {
				clearInterval(timer)
				setTimeLeft('Offer ended')
			} else {
				const days = Math.floor(distance / (1000 * 60 * 60 * 24))
				const hours = Math.floor(
					(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				)
				const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
				const seconds = Math.floor((distance % (1000 * 60)) / 1000)

				setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
			}
		}, 1000)

		return () => clearInterval(timer)
	}, [endDate])

	return (
		<div className="absolute top-2 right-2 z-20 bg-black bg-opacity-75 text-white px-2 py-1 rounded-md text-xs">
			{timeLeft}
		</div>
	)
}

export default CountdownTimer
