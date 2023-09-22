

import { Feed } from "@components/Feed"


export default function Home() {
  return (
      <section className = "w-full flex-center flex-col">
          <h1 className="head_text text-center dark:text-gray-100">
              Discover & Share

              <br className="max-md:hidden" />
              <span className="orange_gradient text-center"> Suggestions of the world.</span>
          </h1>

          <p className="desc text-center dark:text-orange-200">
              Suggestra is a community of people who share and discover new ideas and suggestions for any topic/problem under the sun.
          </p>



          <Feed />
    </section>
  )
}
