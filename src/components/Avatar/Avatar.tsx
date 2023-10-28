import Image from "next/image";
import { profile } from "@/data/profile";

type AvatarProps = {
  width: number;
  height: number;
};

export function Avatar({ width, height }: AvatarProps) {
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
        alt={profile.fullName}
        width={width}
        height={height}
        style={{
          borderRadius: "50%",
        }}
      />
    </div>
  );
}
