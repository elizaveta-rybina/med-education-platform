import { Modal } from '@/shared/ui/modal'
import Button from '@/shared/ui/button/Button'

interface DeleteCourseModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
}

export const DeleteCourseModal = ({
	isOpen,
	onClose,
	onConfirm
}: DeleteCourseModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} className='p-6 max-w-lg w-full'>
			<h3 className='text-lg font-medium text-gray-900 dark:text-gray-200'>
				Точно удалить?
			</h3>
			<p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
				Это действие нельзя отменить. Курс будет удалён навсегда.
			</p>
			<div className='mt-6 flex justify-end space-x-4'>
				<Button variant='outline' onClick={onClose}>
					Нет
				</Button>
				<Button variant='primary' onClick={onConfirm}>
					Да
				</Button>
			</div>
		</Modal>
	)
}
