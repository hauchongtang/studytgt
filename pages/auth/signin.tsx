import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CtxOrReq } from "next-auth/client/_utils";
import LandingNavBar from "../../components/TopNavBar/LandingNavBar";

interface ISignInProps {
  csrfToken: string
}

export default function Signin(props: ISignInProps) {
  const router = useRouter();
  const { status } = useSession();
  const { csrfToken } = props;

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status]);

  return (
    <>
    <LandingNavBar />
    <section className="h-screen bg-violet-50">
      
      <div className="px-6 h-full text-gray-800">
        <div
          className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
        >
          <div
            className="relative grow-0 shrink-1 left-4 md:shrink-0 basis-auto lg:w-5/12 md:w-6/12 mb-12 md:mb-0"
          >
            <img
              src="/static/loginvector.png"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-12 xl:ml-20 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form method="post" action="/api/auth/callback/credentials">
              <h2 className="text-2xl md:text-3xl text-white font-bold mb-1 py-8">Login to get efficient ✌️</h2>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <div className="mb-6">
                <label className="text-white text-lg font-bold ">
                  Email:
                  <input
                    name="username"
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Email address"
                  />
                </label>
              </div>
              <div className="mb-6">
                <label className="text-white text-lg font-bold">
                  Password:
                  <input
                    name="password"
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Password"
                  />
                </label>
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-pink-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Login
                </button>
                <p className="text-sm text-white font-semibold mt-2 pt-1 mb-0">
                  Don&apos;t have an account?
                  <a
                    href="#!"
                    className="text-white p-1.5 mx-2 rounded-2xl bg-pink-600"
                  >Register</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export async function getServerSideProps(context: CtxOrReq | undefined) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}