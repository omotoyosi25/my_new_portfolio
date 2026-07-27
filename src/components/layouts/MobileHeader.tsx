"use state";

import { CloseIcon } from "@/components/icons";
import { cn } from "@/utils/classNames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { ClientOnly } from "../core/ClientOnly";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../core/Dialog";
interface UseBooleanStateControlProps {
  isMenuModal: boolean;
  setMenuModal: React.Dispatch<React.SetStateAction<boolean>>;
  heading: string;
}

function MenuModal({ isMenuModal, setMenuModal }: UseBooleanStateControlProps) {
  const pathname = usePathname();

  const headerLink = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/about",
      name: "About",
    },
    {
      link: "/projects",
      name: "Projects",
    },
    {
      link: "/contact-us",
      name: "Contact Us",
    },
  ];

  const [SponsorDetail, setSponsorDetails] = useState(false);
  const [ParticipantDetail, setParticipantDetails] = useState(false);

  return (
    <div>
      <ClientOnly>
        <Dialog open={isMenuModal}>
          <DialogContent className="bg-[#000410] border-white border-[0.6px]">
            <DialogHeader className="">
              <DialogTitle>Menu</DialogTitle>
              <DialogClose
                className="bg-transparent"
                onClick={() => setMenuModal(false)}
              >
                <CloseIcon />
              </DialogClose>
            </DialogHeader>
            <DialogBody className="">
              <ul className="font-medium">
                {headerLink.map((href, index) => (
                  <div key={index}>
                    <li className="border-b-[0.15px] border-b-white/30 py-5">
                      <Link
                        href={href?.link}
                        className={cn(
                          "hover:text-[#9C9C9C]",
                          pathname == href?.link
                            ? "text-white font-semibold"
                            : "text-[#9C9C9C]",
                        )}
                      >
                        {href?.name}
                      </Link>
                    </li>
                  </div>
                ))}
              </ul>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </ClientOnly>
    </div>
  );
}

export default MenuModal;
