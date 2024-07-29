import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { MODAL_TYPES } from "../../../constants/general";
import { Link, NavLink, useLocation } from "react-router-dom";
import PATHS from "../../../constants/paths";
import { useMainContext } from "../../../context/MainContext";

const HeaderAuth = () => {
  const { handleShowModal, profile, handleLogout } = useAuthContext();
  const { showNavBar } = useMainContext();
  const [isDropDown, setIsDropDown] = useState(false);
  const currentPath = useLocation().pathname;
  useEffect(() => {
    setIsDropDown?.(false);
    if (showNavBar) {
      setIsDropDown?.(false);
    }
  }, [currentPath, showNavBar]);
  // useEffect(() => {
  //   if (showNavBar) {
  //     setIsDropDown?.(false);
  //   }
  // }, [showNavBar]);
  const _onShowModal = (modalType) => {
    handleShowModal?.(modalType);
  };

  const _onClickDropDown = (e) => {
    e.stopPropagation();
    setIsDropDown((prev) => !prev);
  };
  const _handleLogout = () => {
    handleLogout();
    setIsDropDown(false);
  };

  return (
    <>
      {!!!profile ? (
        <div className="header__auth">
          <a
            // href="javascript:void(0)"
            className="btn btn--transparent btnmodal"
            data-modal="mdlogin"
          >
            <span onClick={() => _onShowModal(MODAL_TYPES.register)}>
              Đăng ký /&nbsp;
            </span>
            <span onClick={() => _onShowModal(MODAL_TYPES.login)}>
              Đăng nhập
            </span>
          </a>
        </div>
      ) : (
        <div className="header__logged">
          <div className="userlogged">
            <div
              className="userlogged__avatar user"
              data-dropdown="userlogged__dropdown"
              onClick={_onClickDropDown}
            >
              <div className="userlogged__avatar-img user__img">
                <img src="/img/avatar_nghia.jpg" alt="Avatar teacher" />
              </div>
              <i className="userlogged__avatar-icon">
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 3.5L7.00003 10.5L14 3.5H0Z" fill="white" />
                </svg>
              </i>
            </div>
            <div
              className={`userlogged__dropdown dropdown ${
                isDropDown ? "active" : ""
              }`}
            >
              <div className="userlogged__dropdown-info">
                <div className="user__img">
                  <img src="/img/avatar_nghia.jpg" alt="Avatar teacher" />
                </div>
                <NavLink
                  end
                  to={PATHS.PROFILE.INDEX}
                  className="user__info"
                  onClick={_onClickDropDown}
                >
                  <p className="title --t4">
                    <strong>{profile.firstName}</strong>
                  </p>
                  <span className="email">Thông tin tài khoản</span>
                </NavLink>
              </div>
              <div className="userlogged__dropdown-list">
                <NavLink
                  onClick={_onClickDropDown}
                  to={PATHS.PROFILE.MY_COURSE}
                >
                  Khóa học của tôi
                </NavLink>
                <NavLink
                  onClick={_onClickDropDown}
                  to={PATHS.PROFILE.MY_PAYMENT}
                >
                  Lịch sử thanh toán
                </NavLink>
                <NavLink onClick={_onClickDropDown} to={PATHS.CONTACT}>
                  Hỗ trợ
                </NavLink>
                <Link to={PATHS.HOME} onClick={_handleLogout}>
                  Đăng xuất{" "}
                  <i>
                    <img src="/img/iconlogout.svg" alt="logout icon" />
                  </i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderAuth;
