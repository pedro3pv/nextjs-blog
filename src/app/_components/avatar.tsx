import { type Author } from "@/interfaces/author";

type Props = {
  name: string;
  picture: string;
  size?: "sm" | "md" | "lg";
};

export default function Avatar({ name, picture, size = "md" }: Props) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  return (
    <div className="flex items-center">
      <img
        src={picture || "/placeholder.svg"}
        className={`${sizeClasses[size]} rounded-full mr-4`}
        alt={name}
      />
    </div>
  );
}
