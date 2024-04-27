import { FaGithub , FaLinkedin } from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";
import { IoIosMail } from "react-icons/io";

export default function Footer(){

    return (
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
          <nav>
            <div className="grid grid-flow-col gap-4">
              <a>
                <FaGithub size={32}/>
              </a>
              <a>
                <FaLinkedin size={32}/>
              </a>
              <a>
                <BiSolidDonateHeart size={32}/>
              </a>
              <a>
                <IoIosMail size={32}/>
              </a>
            </div>
          </nav> 
      </footer>
    )

}