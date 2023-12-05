// "use client";

import { Footer } from "flowbite-react";
import Link from "next/link";
import {
  BsFacebook,
  BsGithub,
  BsLinkedin,
} from "react-icons/bs";
import { BiLogoUpwork } from "react-icons/bi";


const CustomFooter = () => {
  return (
    <Footer container className="p-3 px-6">
      <div className="w-full sm:flex sm:items-center sm:justify-between">
        <Footer.Copyright href="#" by="codeKase Ltd.™" year={2023} />
        <div className="flex space-x-6 sm:mt-0 sm:justify-center">
        <Link
            href="https://www.upwork.com/freelancers/~01332533512b7b4849"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:hover:text-white"
          >
            <Footer.Icon icon={BiLogoUpwork} />
          </Link>
          <Link
            href="https://github.com/CaseySMiller"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:hover:text-white"
          >
            <Footer.Icon icon={BsGithub} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/casey-miller-3b376444/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:hover:text-white"
          >
            <Footer.Icon icon={BsLinkedin} />
          </Link>
          <Link
            href="https://www.facebook.com/profile.php?id=61554002825177"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:hover:text-white"
          >
            <Footer.Icon icon={BsFacebook} />
          </Link>
        </div>
      </div>
    </Footer>
  );
};
export default CustomFooter;
