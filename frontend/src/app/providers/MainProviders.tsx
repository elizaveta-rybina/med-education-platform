import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/mainStore'

type Props = {
	children: ReactNode
}

export const MainProviders = ({ children }: Props) => {
	return <Provider store={store}>{children}</Provider>
}
