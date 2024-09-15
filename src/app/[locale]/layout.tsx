import FooterNav from "@/components/Footer";
import Header from "@/components/Header";
import getRealPathname from "lib/getRealPathname";
import { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateMetadata() {
  const realPathname = getRealPathname();

  const titleTranslation = await getTranslations("MetaTitle");
  const title = titleTranslation(realPathname);

  const descriptionTranslation = await getTranslations("MetaDescription");
  const description = descriptionTranslation(realPathname);

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
