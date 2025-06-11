import Image from "next/image";
import { profile } from "@/data/profile";

type AvatarProps = {
  width: number;
  height: number;
  alt?: string;
};

export function Avatar({ width, height, alt }: AvatarProps) {
  return (
    <div
      className="max-w-full"
      style={{
        width,
        height,
      }}
    >
      <Image
        src={profile.avatarUrl}
        alt={alt || profile.fullName}
        width={width}
        height={height}
        style={{
          borderRadius: "50%",
        }}
      />
    </div>
  );
}
