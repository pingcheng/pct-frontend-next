import { JSX } from "react";
import styles from "./style.module.css";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = {
  text: string;
  level?: HeadingLevel;
  align?: "left" | "center" | "right";
  className?: string;
};

export function Heading({
  text,
  level = 1,
  align = "left",
  className,
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const classLists = [styles[`heading${level}`] || styles.heading1];

  switch (align) {
    case "center":
      classLists.push(styles.center);
      break;
    case "right":
      classLists.push(styles.right);
      break;
    default:
  }

  if (className) {
    classLists.push(className);
  }

  return <Tag className={classLists.join(" ")}>{text}</Tag>;
}
