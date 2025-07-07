import { useState } from "react"
import { Link } from "react-router"
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons"
import Label from "../form/Label"
import Checkbox from "../form/input/Checkbox"
import Input from "../form/input/InputField"

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          На главную
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Зарегистрироваться
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Введите свою электронную почту и пароль для регистрации!
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
              <button className="inline-flex items-center justify-center gap-3 py-2 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-5 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path d="M2.04 12c0-5.523 4.476-10 10-10 5.522 0 10 4.477 10 10s-4.478 10-10 10c-5.524 0-10-4.477-10-10z" fill="#FC3F1D"/><path d="M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z" fill="#fff"/>
                  <path xmlns="http://www.w3.org/2000/svg" d="M2.04 12c0-5.523 4.476-10 10-10 5.522 0 10 4.477 10 10s-4.478 10-10 10c-5.524 0-10-4.477-10-10z" fill="#FC3F1D"/>
                  <path xmlns="http://www.w3.org/2000/svg" d="M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z" fill="#fff"/>
                </svg>
                Войти через Яндекс
              </button>
              <button className="inline-flex items-center justify-center gap-3 py-2 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-5 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none">
                  <path d="M0 23.04C0 12.1788 0 6.74826 3.37413 3.37413C6.74826 0 12.1788 0 23.04 0H24.96C35.8212 0 41.2517 0 44.6259 3.37413C48 6.74826 48 12.1788 48 23.04V24.96C48 35.8212 48 41.2517 44.6259 44.6259C41.2517 48 35.8212 48 24.96 48H23.04C12.1788 48 6.74826 48 3.37413 44.6259C0 41.2517 0 35.8212 0 24.96V23.04Z" fill="#0077FF"/>
                  <path d="M25.54 34.5801C14.6 34.5801 8.3601 27.0801 8.1001 14.6001H13.5801C13.7601 23.7601 17.8 27.6401 21 28.4401V14.6001H26.1602V22.5001C29.3202 22.1601 32.6398 18.5601 33.7598 14.6001H38.9199C38.0599 19.4801 34.4599 23.0801 31.8999 24.5601C34.4599 25.7601 38.5601 28.9001 40.1201 34.5801H34.4399C33.2199 30.7801 30.1802 27.8401 26.1602 27.4401V34.5801H25.54Z" fill="white"/>
                </svg>
                Войти через VK ID
              </button>
            </div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Или
                </span>
              </div>
            </div>
            <form>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- First Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Имя<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder="Введите свое имя"
                    />
                  </div>
                  {/* <!-- Last Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Фамилия<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="lname"
                      name="lname"
                      placeholder="Введите свою фамилию"
                    />
                  </div>
                </div>
                {/* <!-- Email --> */}
                <div>
                  <Label>
                    Электронная почта<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Введите свою электронную почту"
                  />
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label>
                    Пароль<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Введите пароль"
                      type={showPassword ? "text" : "password"}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                {/* <!-- Checkbox --> */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={setIsChecked}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    Создавая аккаунт, вы соглашаетесь с{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Условиями использования
                    </span>{" "}
                    и нашей{" "}
                    <span className="text-gray-800 dark:text-white">
                      Политикой конфиденциальности
                    </span>
                  </p>
                </div>
                {/* <!-- Button --> */}
                <div>
                  <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition-all rounded-lg bg-purple-600 shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                    Зарегистрироваться
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Уже есть аккаунт? {""}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Войти
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
