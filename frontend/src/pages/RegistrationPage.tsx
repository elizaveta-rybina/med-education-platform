const RegistrationPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Левая половина - картинка */}
      <div className="hidden lg:block lg:w-1/2 flex items-center m-auto justify-center p-8">
				<img 
					src="src/assets/regBackground.jpg" 
					alt="Registration background"
					className="max-w-full max-h-[80vh] object-contain rounded-lg"
				/>
			</div>
      
      {/* Правая половина - форма */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
  <div className="w-full max-w-md">
    <h3 className="py-4 text-2xl text-center text-gray-800">Создать аккаунт</h3>
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="firstName">
            Имя
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="firstName"
            type="text"
            placeholder="Ваше имя"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="lastName">
            Фамилия
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="lastName"
            type="text"
            placeholder="Ваша фамилия"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="email">
          Электронная почта
        </label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="email"
          type="email"
          placeholder="example@mail.ru"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="password">
            Пароль
          </label>
          <input
            className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type="password"
            placeholder="********"
          />
          <p className="text-xs text-red-500 mt-1">Придумайте пароль</p>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="c_password">
            Подтвердите пароль
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="c_password"
            type="password"
            placeholder="********"
          />
        </div>
      </div>

      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        type="button"
      >
        Зарегистрироваться
      </button>

      <div className="text-center text-sm text-gray-600">
        <p>Уже есть аккаунт? <a href="#" className="text-blue-600 hover:underline">Войти</a></p>
      </div>
    </form>
  </div>
</div>
    </div>
  );
};

export default RegistrationPage;