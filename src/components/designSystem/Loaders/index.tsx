export { default as ThreeDotLoader } from "./ThreeDotLoader"
export { default as SkeletonLoader } from "./SkeletonLoader"

export const optimisticLoaderArray = (amount: number) =>
  Array(amount)
    .fill(0)
    .map((item) => ({ ...item }))
