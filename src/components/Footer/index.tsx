"use client";

import SiteIcon from "@/app/favicon.ico";
import { Footer as FooterElm } from "flowbite-react";
import { useTranslations } from "next-intl";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTelegram,
  BsTwitter,
} from "react-icons/bs";

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <FooterElm container>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FooterElm.Brand
              href="/"
              src={SiteIcon.src}
              alt="Paint My Pet Logo"
              name="Paint My Pet"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterElm.Title title={t("About")} />
              <FooterElm.LinkGroup col>
                <FooterElm.Link href="#">Paint My Pet</FooterElm.Link>
                <FooterElm.Link href="#">Tailwind CSS</FooterElm.Link>
              </FooterElm.LinkGroup>
            </div>
            <div>
              <FooterElm.Title title={t("FollowUs")} />
              <FooterElm.LinkGroup col>
                <FooterElm.Link href="#">Github</FooterElm.Link>
                <FooterElm.Link href="#">Discord</FooterElm.Link>
              </FooterElm.LinkGroup>
            </div>
            <div>
              <FooterElm.Title title={t("Legal")} />
              <FooterElm.LinkGroup col>
                <FooterElm.Link href="#">{t("PrivacyPolicy")}</FooterElm.Link>
                <FooterElm.Link href="#">{t("TermsConditions")}</FooterElm.Link>
              </FooterElm.LinkGroup>
            </div>
          </div>
        </div>
        <FooterElm.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterElm.Copyright href="#" by="PaintMyPet™" year={currentYear} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterElm.Icon href="#" icon={BsFacebook} />
            <FooterElm.Icon href="#" icon={BsInstagram} />
            <FooterElm.Icon href="#" icon={BsTwitter} />
            <FooterElm.Icon
              target="_blank"
              href="https://github.com/KovalchukDanil0/paint-my-pet"
              icon={BsGithub}
            />
            <FooterElm.Icon
              target="_blank"
              href="https://t.me/+Bx6B4ly2UxBiNTcy"
              icon={BsTelegram}
            />
          </div>
        </div>
      </div>
    </FooterElm>
  );
}
