//import { Playfair_Display, Inter } from '@next/font/google';
// const playfairDisplay = Playfair_Display({
//   subsets: ['latin'],
//   weight: ['500', '600', '700', '800'],
// });

// const inter = Inter({
//   subsets: ['latin'],
// });

export default function Header() {
  return (
    <header className="container mx-auto px-2 py-10 flex justify-center">
      <div className="max-w-[90vw] xl:max-w-5xl flex justify-left w-full">
        <div className="max-w-2xl">
          <h1
            className="lg:text-6xl text-5xl font-primary font-semibold text-red-900"
          >
            What are the blood donation trends in Malaysia
          </h1>
          <p
            className="lg:text-lg text-base text-black py-4 font-secondary font-normal tracking-widest"
          >
            Visualize variety of statistics related to blood donation starting
            from year 2006. These charts support zoom and pan feature: use
            scroll or drag to zoom and use &apos;ctrl&apos; + drag to pan.
            Inspired by{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Link to kkmnow website"
              href="https://data.moh.gov.my/blood-donation"
              className="text-blue-500 underline"
            >
              KKMNOW
            </a>
            .
          </p>
        </div>
      </div>
    </header>
  );
}
