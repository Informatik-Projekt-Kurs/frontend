import React from "react";

function Dashboard() {
  return (
    <div className="flex w-full flex-col gap-5 pl-8 md:flex-row">
      <aside className="hidden md:block md:w-1/3 lg:w-1/4">
        <div className="sticky top-8 flex h-[calc(100vh-64px)] flex-row">
          <div className="h-full w-[80px] bg-green-300"></div>
          <div className="h-full w-[230px] bg-green-200"></div>
        </div>
      </aside>
      <main className="min-h-screen w-full py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <h1 className="my-4 text-xl font-bold md:text-2xl">Recently Viewed</h1>

          <div>
            <h2 className="mb-4 text-xl font-bold">Today</h2>

            <ul className="space-y-10">
              <li className="flex items-center space-x-4">
                <img
                  src="https://source.unsplash.com/random/200x200"
                  alt="Product 1"
                  className="size-16 rounded-full"></img>
                <div>
                  <h3 className="text-lg font-semibold">Product 1</h3>
                  <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <img
                  src="https://source.unsplash.com/random/200x200"
                  alt="Product 2"
                  className="size-16 rounded-full"></img>
                <div>
                  <h3 className="text-lg font-semibold">Product 2</h3>
                  <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <img
                  src="https://source.unsplash.com/random/200x200"
                  alt="Product 3"
                  className="size-16 rounded-full"></img>
                <div>
                  <h3 className="text-lg font-semibold">Product 3</h3>
                  <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </li>
            </ul>

            <h2 className="my-4 text-xl font-bold">Yesterday</h2>
            <ul className="space-y-10">
              <li className="flex items-center space-x-4">
                <img
                  src="https://source.unsplash.com/random/200x200"
                  alt="Product 1"
                  className="size-16 rounded-full"></img>
                <div>
                  <h3 className="text-lg font-semibold">Product 1</h3>
                  <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <img
                  src="https://source.unsplash.com/random/200x200"
                  alt="Product 2"
                  className="size-16 rounded-full"></img>
                <div>
                  <h3 className="text-lg font-semibold">Product 2</h3>
                  <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <img
                  src="https://source.unsplash.com/random/200x200"
                  alt="Product 3"
                  className="size-16 rounded-full"></img>
                <div>
                  <h3 className="text-lg font-semibold">Product 3</h3>
                  <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </li>
            </ul>

            <h2 className="my-4 text-xl font-bold">Yesterday</h2>
            <ul className="space-y-10">
              <li className="flex items-center space-x-4">
                <img
                  src="https://source.unsplash.com/random/200x200"
                  alt="Product 1"
                  className="size-16 rounded-full"></img>
                <div>
                  <h3 className="text-lg font-semibold">Product 1</h3>
                  <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <img
                  src="https://source.unsplash.com/random/200x200"
                  alt="Product 2"
                  className="size-16 rounded-full"></img>
                <div>
                  <h3 className="text-lg font-semibold">Product 2</h3>
                  <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <img
                  src="https://source.unsplash.com/random/200x200"
                  alt="Product 3"
                  className="size-16 rounded-full"></img>
                <div>
                  <h3 className="text-lg font-semibold">Product 3</h3>
                  <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </li>
            </ul>

            <h2 className="my-4 text-xl font-bold">Yesterday</h2>
            <ul className="space-y-10">
              <li className="flex items-center space-x-4">
                <img
                  src="https://source.unsplash.com/random/200x200"
                  alt="Product 1"
                  className="size-16 rounded-full"></img>
                <div>
                  <h3 className="text-lg font-semibold">Product 1</h3>
                  <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <img
                  src="https://source.unsplash.com/random/200x200"
                  alt="Product 2"
                  className="size-16 rounded-full"></img>
                <div>
                  <h3 className="text-lg font-semibold">Product 2</h3>
                  <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <img
                  src="https://source.unsplash.com/random/200x200"
                  alt="Product 3"
                  className="size-16 rounded-full"></img>
                <div>
                  <h3 className="text-lg font-semibold">Product 3</h3>
                  <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
