import { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded-md ${className}`}
      {...props}
    />
  );
};

export default Skeleton;