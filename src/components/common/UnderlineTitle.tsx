import { Icons } from "@/components/common/Icons";

type UnderlineTitle = {
  messageOne: string;
  messageTwo: string;
  messageThree?: string;
};
const UnderlineTitle = ({
  messageOne,
  messageTwo,
  messageThree = "",
}: UnderlineTitle) => {
  return (
    <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
      {`${messageOne} `}
      <span className="relative px-2">
        {`${messageTwo} `}
        <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500" />
      </span>{" "}
      {messageThree}
    </h2>
  );
};

export default UnderlineTitle;
