export default function Footer() {
    return (
      <footer className="container mx-auto px-2 py-16 justify-center flex flex-col gap-2">
        <p className="text-lg text-gray-500 text-center z-20">
          Data Source:{' '}
          <a
            href="https://github.com/MoH-Malaysia/data-darah-public"
            className="text-blue-500 underline"
          >
            MoH GitHub
          </a>
        </p>
  
        <p className="text-lg text-gray-500 text-center z-20">
          <a
            href="https://github.com/hmingji/DataViz"
            className="text-blue-500 underline"
          >
            Open source on GitHub
          </a>
        </p>
  
        <p className="text-lg text-gray-500 text-center z-20">
          By{' '}
          <a
            href="https://github.com/hmingji"
            className="text-blue-500 underline"
          >
            @hmingji
          </a>
          , 2023.
        </p>
      </footer>
    );
  }
  