import { useStore } from "@/hooks";
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { IoLogOut, IoMenu } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { CiShoppingCart } from "react-icons/ci";
import { NavLink, useLocation } from "react-router-dom";
import Texts from "./Texts";
import classnames from "classnames";

export default function Drawer() {
  const [show, setShow] = useState(false);
  const { loggedInUser, logout, categories } = useStore();
  const location = useLocation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <IoMenu onClick={handleShow} size="30px" className="d-md-none cursor" />
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fs-4 fw-semibold text-capitalize">
            {loggedInUser?.username && `Hi ${loggedInUser?.username}`}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mb-4">
            {categories.map(({ _id, name }) => (
              <NavLink
                key={_id}
                to={`/products/${name.toLowerCase()}`}
                className={classnames({
                  "d-flex flex-column fs-3 mb-4": true,
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
                  className={`profile fs-3 d-flex align-items-center ${
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
                  className={`profile fs-3 d-flex align-items-center ${
                    location.pathname === "/orders" ? "fw-bold" : ""
                  }`}
                  onClick={handleClose}
                >
                  Orders
                </NavLink>
                <CiShoppingCart size="24px" />
              </div>
              <hr />
              <Texts
                text={
                  <>
                    <IoLogOut className="me-1" />
                    Logout
                  </>
                }
                size="1.3rem"
                className="fw-bold"
                onClick={logout}
              />
            </>
          )}
          {!loggedInUser && (
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <NavLink
                  to="/cart"
                  className="fs-5 fw-medium"
                  onClick={handleClose}
                >
                  Cart
                </NavLink>
                <CiShoppingCart size="24px" />
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <NavLink
                  to="/login"
                  className="fs-5 fw-medium mb-4"
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
