import { useEffect } from 'react'
import {
	useLocation,
	useNavigate,
	NavigateFunction,
	Location
} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { selectAuth } from '@/app/store/auth/selectors'
import { resetAuthState } from '@/app/store/auth/slice'
import { fetchUser } from '@/app/store/auth/thunks'
import { clearAuthToken, setAuthToken } from '@/app/api/client'
import { authApi } from '@/app/store/auth'

export const useAuthInitializer = () => {
	const dispatch = useAppDispatch()
	let navigate: NavigateFunction | undefined
	let location: Location | undefined

	try {
		navigate = useNavigate()
		location = useLocation()
	} catch (err) {
		console.warn(
			'useNavigate/useLocation not available in useAuthInitializer. Ensure this hook is used within RouterProvider.',
			err
		)
		return
	}

	const { user } = useAppSelector(selectAuth)

	useEffect(() => {
		const initializeAuth = async () => {
			const storedToken = localStorage.getItem('token')

			if (storedToken && user) {
				try {
					await dispatch(fetchUser()).unwrap()
				} catch (err) {
					console.error('Failed to initialize auth:', err)
					try {
						const refreshResponse = await authApi.refreshToken()
						setAuthToken(refreshResponse.token)
						await dispatch(fetchUser()).unwrap()
					} catch (refreshErr) {
						console.error('Failed to refresh token:', refreshErr)
						clearAuthToken()
						dispatch(resetAuthState())
						if (
							navigate &&
							location &&
							!['/signin', '/signup'].includes(location.pathname)
						) {
							navigate(
								`/signin?redirectTo=${encodeURIComponent(
									location.pathname + location.search
								)}`
							)
						} else {
							console.warn(
								'Navigation skipped: navigate or location not available'
							)
						}
					}
				}
			}
		}

		initializeAuth()
	}, [dispatch, user, navigate, location])
}
