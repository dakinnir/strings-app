import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen justify-center items-center w-full">
            <div className="flex flex-col gap-12 p-5 py-10 max-w-md w-full rounded-lg">
                <div className="flex flex-col gap-4 text-center">
                    <h1 className="text-center text-3xl tracking-widest font-medium">
                        Strings App
                    </h1>
                    <p className="text-slate-500 text-[0.8rem]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nulla repellendus laboriosam doloremque tempore eum quae.
                    </p>
                </div>

                <div className="flex flex-col gap-2 text-sm text-center">
                    <Link href="/signin" className="bg-slate-50 hover:bg-slate-100 p-2 rounded-lg block border">
                        Sign in
                    </Link>
                    <Link href="/signup" className="bg-slate-900 hover:bg-slate-800 text-white p-2 rounded-lg block">
                        Sign up
                    </Link>
                </div>
            </div>
        </main>
    )
}
