"use client";

import SiteIcon from "@/app/favicon.ico";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Footer, Link } from "react-daisyui";

export default function FooterNav() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <Footer className="bg-neutral p-10 text-neutral-content">
      <div>
        <Image className="size-16" src={SiteIcon} alt="Paint My Pet Logo" />
        <h2>Paint my pet</h2>
      </div>

      <div>
        <Footer.Title>Services</Footer.Title>
        <Link href="" className="link-hover link">
          Branding
        </Link>
        <Link href="" className="link-hover link">
          Design
        </Link>
        <Link href="" className="link-hover link">
          Marketing
        </Link>
        <Link href="" className="link-hover link">
          Advertisement
        </Link>
      </div>

      <div>
        <Footer.Title>Company</Footer.Title>
        <Link href="" className="link-hover link">
          About us
        </Link>
        <Link href="" className="link-hover link">
          Contact
        </Link>
        <Link href="" className="link-hover link">
          Jobs
        </Link>
        <Link href="" className="link-hover link">
          Press kit
        </Link>
      </div>

      <div>
        <Footer.Title>Legal</Footer.Title>
        <Link href="" className="link-hover link">
          Terms of use
        </Link>
        <Link href="" className="link-hover link">
          Privacy policy
        </Link>
        <Link href="" className="link-hover link">
          Cookie policy
        </Link>
      </div>
    </Footer>
  );
}

/* 
<div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
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
      </div> */
