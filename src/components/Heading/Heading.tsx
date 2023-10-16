import styles from "./style.module.scss";

type HeadingProps = {
  text: string;
  align?: "left" | "center" | "right";
};

export function Heading({ text, align = "left" }: HeadingProps) {
  const classLists = [styles.heading1];

  switch (align) {
    case "center":
      classLists.push(styles.center);
      break;
    case "right":
      classLists.push(styles.right);
      break;
    default:
  }

  return <h1 className={classLists.join(" ")}>{text}</h1>;
}
