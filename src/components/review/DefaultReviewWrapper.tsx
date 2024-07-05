import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import ReviewGrid from "@/components/review/ReviewGrid";

const DefaultReviewWrapper = () => {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      <img
        aria-hidden="true"
        src="/what-people-are-buying.png"
        alt="what people are buying"
        className="absolute select-none hidden xl:block -left-32 top-1/3 "
      />
      <ReviewGrid />
    </MaxWidthWrapper>
  );
};

export default DefaultReviewWrapper;
