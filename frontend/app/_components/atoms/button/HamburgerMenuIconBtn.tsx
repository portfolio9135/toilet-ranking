import React, { FC, memo } from "react";

type Props = {
  isHamburgerMenuOpen: boolean;
  toggleHamburgerMenuDrawer: () => void;
};

const MenuIconButton: FC<Props> = memo((props) => {
  const { isHamburgerMenuOpen, toggleHamburgerMenuDrawer } = props;

  return (
    <button
      aria-label="メニューボタン"
      className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none"
      onClick={toggleHamburgerMenuDrawer}
    >
      {isHamburgerMenuOpen ? (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </button>
  );
});

MenuIconButton.displayName = "MenuIconButton";

export default MenuIconButton;