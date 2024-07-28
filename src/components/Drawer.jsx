import { useStore } from "@/hooks";
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { IoMenu } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { NavLink, useLocation } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import Texts from "./Texts";
import classnames from "classnames";

export default function Drawer() {
  const [show, setShow] = useState(false);
  const { loggedInUser, logout, categories } = useStore();
  const location = useLocation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <>
      <IoMenu onClick={handleShow} size="20px" className="d-md-none cursor" />
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fs-4 fw-semibold text-capitalize">
            {loggedInUser?.username && `Hi ${loggedInUser?.username}`}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <NavLink
                to="/products/search"
                className={`profile fs-4 d-flex align-items-center text-black w-100 ${
                  location.pathname === "/products/search" ? "fw-bold" : ""
                }`}
                onClick={handleClose}
              >
                Search
              </NavLink>
              <CiSearch size="24px" />
            </div>
            <hr />
            {categories?.map(({ _id, name }) => (
              <NavLink
                key={_id}
                to={`/products/${name.toLowerCase()}`}
                className={classnames({
                  "profile d-flex flex-column fs-3 mb-4 text-black": true,
                  "text-black fw-bold":
                    location.pathname === `/products/${name.toLowerCase()}`,
                })}
                onClick={handleClose}
              >
                {name}
              </NavLink>
            ))}
          </div>
          <hr />
          {loggedInUser && (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <NavLink
                  to={`/profile/${loggedInUser?.username}`}
                  className={`profile fs-4 d-flex align-items-center text-black w-100 ${
                    location.pathname === "/profile" ? "fw-bold" : ""
                  }`}
                  onClick={handleClose}
                >
                  Profile
                </NavLink>
                <GoPerson size="24px" />
              </div>
              <br />
              <div className="d-flex justify-content-between align-items-center">
                <NavLink
                  to={`/orders`}
                  className={`profile fs-4 d-flex align-items-center text-black w-100 ${
                    location.pathname === "/orders" ? "fw-bold" : ""
                  }`}
                  onClick={handleClose}
                >
                  Orders
                </NavLink>
                <CiShoppingCart size="24px" />
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <Texts
                  text="Logout"
                  size="1.3rem"
                  className="fw-bold w-100"
                  onClick={handleLogout}
                />
                <IoIosLogOut size="24px" />
              </div>
            </>
          )}
          {!loggedInUser && (
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <NavLink
                  to="/login"
                  className="fs-5 fw-medium text-black w-100"
                  onClick={handleClose}
                >
                  Login
                </NavLink>
                <GoPerson size="24px" />
              </div>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
