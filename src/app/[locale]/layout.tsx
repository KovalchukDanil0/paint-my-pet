import DisclaimerAccordion from "@/components/DisclaimerAccordion";
import FooterNav from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { twMerge } from "tailwind-merge";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata() {
  const requestUrl = headers().get("x-original-url");
  if (!requestUrl) {
    throw new Error("request url is undefined");
  }
  const pathname = requestUrl.replace(/^\/\w\w/, "");
  console.log(pathname);

  const titleTranslation = await getTranslations("MetaTitle");
  const title = titleTranslation(pathname);

  const descriptionTranslation = await getTranslations("MetaDescription");
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
          <DisclaimerAccordion />
          <FooterNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
