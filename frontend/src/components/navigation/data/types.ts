export interface Product {
	name: string
	description: string
	to: string
	icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
}

export interface User {
	id?: number
	name?: string
	email?: string
	avatar?: string // Added to support avatar image
}
