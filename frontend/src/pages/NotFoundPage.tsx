const NotFoundPage = () => {
  return (
    <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-purple-600">404</h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Что-то пропало.</p>
                <p className="mb-4 text-lg font-light text-gray-500 ">Извините, мы не можем найти эту страницу. Вы найдете много интересного на главной странице.</p>
                <a href="/" className="inline-flex text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Назад на главную</a>
            </div>   
        </div>
    </section>
  );
};

export default NotFoundPage;
