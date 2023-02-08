export default function Header() {
  return (
    <header className="container mx-auto px-2 py-10 flex justify-center">
      <div className="max-w-5xl flex justify-left w-full">
        <div className="max-w-2xl">
          <h1 className="text-5xl">
            What are the blood donation trends in Malaysia
          </h1>
          <p className="text-lg text-gray-500 py-4">
            Visualize variety of statistics related to blood donation starting
            from year 2006. These charts support zoom and pan feature: scroll or
            drag to zoom and &apos;ctrl&apos; + drag to pan. Inspire by{' '}
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
