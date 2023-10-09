import React from "react";
import IconMenu from "./icons/IconMenu";
import IconAdd from "./icons/IconAdd";
import { useThemeProvider } from "../zustang/ThemeProvider";


function Header({openSidebarClick, title, newChatClick}) {
  const {theme} = useThemeProvider();
  return (
    <header className={`flex justify-between items-center w-full  border-b border-b-gray-600 p-2 md:hidden ${theme === 'dark' ? '' : 'bg-what-grenn'}`}>
      
      <div onClick={openSidebarClick}>
        <IconMenu width={24} height={24} />
      </div>

      <div className="mx-2 truncate">{title}</div>

      <div onClick={newChatClick} className="">
        <IconAdd width={24} height={24} />
      </div>

    </header>
  );
}

export default Header;