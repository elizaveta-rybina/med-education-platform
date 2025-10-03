import { FooterItem, UpButton } from '@/entities/footer'
import { useTranslation } from 'react-i18next'
import mail from '/assets/icons/mail.svg'
import telegram from '/assets/icons/telegram.svg'
import vk from '/assets/icons/vk.svg'

export const Footer = () => {
	const { t } = useTranslation('coursePage')
	return (
		<footer className='w-full h-96 px-26 bg-gradient-to-br from-fuchsia-800 to-purple-900 rounded-[40px] mt-28'>
			<h2 className='text-left text-white text-5xl font-light uppercase italic pt-8'>
				{t('footer.title')}
			</h2>
			<div className='flex flex-row justify-between gap-20 mt-10'>
				<FooterItem
					Icon={mail}
					text={[t('footer.email1'), t('footer.email2')]}
				/>
				<FooterItem
					Icon={telegram}
					text={[t('footer.telegram1'), t('footer.telegram2')]}
				/>
				<FooterItem Icon={vk} text={[t('footer.vk_link')]} />
				<UpButton text={t('footer.up_button')} />
			</div>
			<p className='text-left text-white text-sm font-light mt-16'>
				{t('footer.politic')}
			</p>
		</footer>
	)
}
