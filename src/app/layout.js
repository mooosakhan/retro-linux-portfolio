import "./globals.css";

export const metadata = {
  title: "Retro Linux Desktop",
  description: "A retro Linux desktop UI built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="overflow-hidden">
        {children}
      </body>
    </html>
  );
}
