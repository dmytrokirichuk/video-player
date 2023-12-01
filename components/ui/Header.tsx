import { Text, ITextProps } from "native-base";
import { FC } from "react";

const Header: FC<ITextProps> = (props) => {
  return <Text {...props} fontSize="2xl" fontWeight="bold" />;
};

export default Header;
