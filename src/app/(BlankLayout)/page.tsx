import { profile, socialUrls } from "@/data/profile";
import styles from "./style.module.scss";
import { FiGithub, FiSmile } from "react-icons/fi";
import Link from "next/link";
import { Avatar } from "@/components/Avatar";

export default function Home() {
  return (
    <main
      className="h-screen flex flex-col items-center justify-center mx-auto gap-8 max-w-lg"
      style={{
        maxWidth: "90%",
      }}
    >
      {/* Avatar */}
      <Avatar width={192} height={192} />

      {/* Description */}
      <div className={styles.description}>
        <p>
          Hi! It is <span className="text-black">{profile.fullName}</span> here.
        </p>
        <p>
          I am a high passionate{" "}
          <span className="text-black">software engineer</span>, enjoy the
          latest techs and bring them into reality.
        </p>
        <p>
          Focusing on{" "}
          <span className="text-black">
            Node/TS/JS, Java, PHP, Linux, Server management
          </span>
          , etc...
        </p>
      </div>

      {/* Social links */}
      <div className="flex flex-wrap content-around text-lg justify-center">
        <a
          // className="social-link mr-4 p-2"
          className={styles.socialLink}
          href={socialUrls.github}
          target="_blank"
        >
          <FiGithub /> Github
        </a>
        <Link className={styles.socialLink} href="/about">
          <FiSmile /> About
        </Link>
      </div>
    </main>
  );
}
