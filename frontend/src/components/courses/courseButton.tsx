import {
	ModalButtonAuthentication,
	ModalSignIn,
	NavButton,
} from '@/components/shared'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface CourseButtonProps {
	isRegistered: boolean
	isLoggedIn: boolean
	onRegister: () => void
}

const CourseButton: React.FC<CourseButtonProps> = ({
	isRegistered,
	isLoggedIn,
	onRegister,
}) => {
	const { t } = useTranslation('coursePage')
	const [registered, setRegistered] = useState(isRegistered)
	const [showModal, setShowModal] = useState(false)

	const handleClick = () => {
		if (isLoggedIn) {
			if (!registered) {
				setRegistered(true)
				onRegister()
			}
		} else {
			setShowModal(true)
		}
	}

	return (
		<div className=''>
			{isLoggedIn ? (
				<NavButton
					description={registered ? t('goToCourse') : t('register')}
					link={registered ? '/course/physiology' : undefined}
					onClick={handleClick}
				/>
			) : (
				<>
					<ModalButtonAuthentication
						description={t('register')}
						onClick={() => setShowModal(true)}
					/>
					<ModalSignIn
						title={t('signIn')}
						isOpen={showModal}
						onClose={() => setShowModal(false)}
					/>
				</>
			)}
		</div>
	)
}

export default CourseButton
