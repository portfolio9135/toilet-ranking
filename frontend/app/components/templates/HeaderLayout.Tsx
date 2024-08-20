import React, { FC, ReactNode, memo } from "react";

import Header from "../organisms/layout/Header";

type Props = {
  children: ReactNode;
};

const HeaderLayout: FC<Props> = memo((props) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
    </>
  );
});

export default HeaderLayout;