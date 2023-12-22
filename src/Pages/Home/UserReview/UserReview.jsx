const UserReview = () => {
  return (
    <div id="userReview" >
      <div>
        <section className="bg-white dark:bg-gray-900">
          <div className="container px-6 py-10 mx-auto">
            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
              What our <span className="text-main ">clients</span> say
            </h1>

            <p className="max-w-2xl mx-auto mt-6 text-center font-semibold text-gray-500 dark:text-gray-300">
            Let's Hear From Some Of our User From Different Field How Task Vault Help them to manage their time and make them productive
            </p>

            <div className="grid grid-cols-1 gap-8 mx-auto mt-8 lg:grid-cols-2 xl:mt-10 max-w-7xl">
              <div className="p-6 bg-gray-100 rounded-lg dark:bg-gray-800 md:p-8">
                <p className="leading-loose text-gray-500 font-medium dark:text-gray-300">
                  “"This task Vault Website is a game-changer. The sleek design and intuitive features make it easy to stay organized and on top of my tasks. It's become an essential part of my daily routine, and I love how it streamlines my workflow effortlessly.”.
                </p>

                <div className="flex items-center mt-6">
                  <img
                    className="object-cover rounded-full w-14 h-14"
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                    alt=""
                  />

                  <div className="mx-4">
                    <h1 className="font-semibold tex">Robbert</h1>
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      CTO, Robert Consultency
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-100 rounded-lg dark:bg-gray-800 md:p-8">
                <p className="leading-loose text-gray-500 font-medium dark:text-gray-300">
                  “This Website has transformed how I manage tasks. The user-friendly interface and customizable options are spot-on. It keeps me on track without being overwhelming. A must-have for anyone looking to boost productivity with minimal effort”.
                </p>

                <div className="flex items-center mt-6">
                  <img
                    className="object-cover rounded-full w-14 h-14"
                    src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt=""
                  />

                  <div className="mx-4">
                    <h1 className="font-semibold tex">Mia Brown</h1>
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      Marketing Manager at Stech
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
      </div>
    </div>
  );
};

export default UserReview;
