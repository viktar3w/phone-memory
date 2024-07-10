import { ReactNode } from "react";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import Steps from "@/components/common/Steps";

type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <MaxWidthWrapper className="flex flex-1 flex-col">
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
};

export default Layout;
