import { mainStore } from 'app/store'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'

type Props = {
	children: ReactNode
}

export const MainProviders = ({ children }: Props) => {
	return <Provider store={mainStore}>{children}</Provider>
}
