import FooterNav from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { twMerge } from "tailwind-merge";
import "./globals.sass";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata() {
  const titleTranslation = await getTranslations("MetaTitle");
  const descriptionTranslation = await getTranslations("MetaDescription");

  const pathname = new URL(headers().get("x-request-url")!).pathname.replace(
    /^\/\w\w/,
    "",
  );

  const title = titleTranslation(pathname);
  const description = descriptionTranslation(pathname);

  const meta: Metadata = {
    metadataBase: new URL("https://paint-my-pet.vercel.app"),
    title,
    description,
    openGraph: { title, description },
  };
  return meta;
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<Props>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <head></head>
      <body
        className={twMerge(
          "bg-gray-50 text-black dark:bg-black dark:text-white",
          inter.className,
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          <main>{children}</main>
          <FooterNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
