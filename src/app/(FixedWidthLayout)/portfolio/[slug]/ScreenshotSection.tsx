import { Heading } from "@/components/Heading";
import styles from "./style.module.css";
import Image from "next/image";

type ScreenshotSectionProps = {
  images: string[];
};

export function ScreenshotSection({ images }: ScreenshotSectionProps) {
  if (images.length === 0) {
    return <></>;
  }

  const columnCount = 3;
  const columns: string[][] = [];

  const length = columns.length;
  images.forEach((image, index) => {
    const columnIndex = index % columnCount;
    if (!columns[columnIndex]) {
      columns[columnIndex] = [];
    }
    columns[columnIndex].push(image);
  });

  return (
    <div className="w-full bg-gray-100 p-8 px-8 rounded-2xl mt-8 bg-opacity-50">
      <div className="mb-8">
        <Heading text="Screenshots" align="center" />
      </div>
      <div className={styles.portfolioScreenshots}>
        {columns.map((column, index) => {
          return (
            <div key={index}>
              {column.map((image) => {
                return (
                  <div key={image} className={styles.screenshot}>
                    <Image src={image} alt="Screenshot" fill />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
