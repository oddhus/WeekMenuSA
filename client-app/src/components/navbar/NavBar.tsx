import React from "react";
import { Logo } from "./Logo";
import { MenuLinks } from "./MenuLinks";
import { MenuToggle } from "./MenuToggle";
import { NavBarContainer } from "./NavBarContainer";

export const NavBar: React.FC = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo w="100px" color={["white", "pink.500", "pink.500", "pink.500"]} />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};
