import { useTranslation } from 'react-i18next'

export const useNavLinks = () => {
  const { t } = useTranslation('header')

  return [
    { name: t('contacts'), to: '/contacts' },
    { name: t('about'), to: '/about' },
    { name: t('company'), to: '/company' },
  ]
}