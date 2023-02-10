import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-gradient-to-b from-red-100 to-amber-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
