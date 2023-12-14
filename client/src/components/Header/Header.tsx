import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import './Header.scss';

interface HeaderProps {
  currentPage: string
}

const Header: FC<HeaderProps> = ({currentPage}) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <ul className="header-navigation">
        <li className="header-navigation__item">
                                     <span
                                       className={"header-navigation__link__logo"}>
                                          WEB 202
                                     </span>
        </li>
        <li className="header-navigation__item">
                                     <span
                                       className={currentPage === "accounts" ? "header-navigation__link  header-navigation__link_active" : "header-navigation__link "}
                                       onClick={() => navigate("/")}>
                                          Accounts
                                     </span>
        </li>

        <li className="header-navigation__item">
                                    <span
                                      className={currentPage === "about" ? "header-navigation__link  header-navigation__link_active" : "header-navigation__link "}
                                      onClick={() => navigate("/about")}>
                                        Abouts us
                                    </span>
        </li>
      </ul>
    </div>
  );
}

export default Header;
