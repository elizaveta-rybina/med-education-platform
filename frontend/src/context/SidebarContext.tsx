import { createContext, ReactNode, useContext, useState } from 'react'

interface SidebarContextType {
	isMobileOpen: boolean
	isExpanded: boolean
	isHovered: boolean
	toggleMobileSidebar: () => void
	toggleSidebar: () => void
	setIsHovered: (hovered: boolean) => void
}

export const SidebarContext = createContext<SidebarContextType | undefined>(
	undefined
)

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
	children
}) => {
	const [isMobileOpen, setIsMobileOpen] = useState(false)
	const [isExpanded, setIsExpanded] = useState(true)
	const [isHovered, setIsHovered] = useState(false)

	const toggleMobileSidebar = () => {
		setIsMobileOpen(prev => !prev)
	}

	const toggleSidebar = () => {
		setIsExpanded(prev => !prev)
	}

	return (
		<SidebarContext.Provider
			value={{
				isMobileOpen,
				isExpanded,
				isHovered,
				toggleMobileSidebar,
				toggleSidebar,
				setIsHovered
			}}
		>
			{children}
		</SidebarContext.Provider>
	)
}

export const useSidebar = (): SidebarContextType => {
	const context = useContext(SidebarContext)
	if (!context) {
		throw new Error('useSidebar must be used within a SidebarProvider')
	}
	return context
}
