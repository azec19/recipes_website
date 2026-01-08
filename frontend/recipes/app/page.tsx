import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-between font-sans dark:bg-black">
      <main className="flex flex-row gap-x-20 py-3 px-3 min-w-screen bg-(--color-background) sm:items-start">
        <Image
          className="dark:invert"
          src="/logo.svg"
          alt="Next.js logo"
          width={100}
          height={10}
          priority
        />
        <div className="text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-script text-5xl leading-10 tracking-tight text-black dark:text-zinc-50">
            recipes 
          </h1>
        </div>
        <div className="flex flex-row gap-x-10 justify-between ext-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            login
            </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            add a new recipes
          </a>
        </div>
      </main>
    </div>
  );
}
