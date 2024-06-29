import { useStore } from "@/hooks";
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { IoLogOut, IoMenu} from "react-icons/io5";
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
      <IoMenu
        onClick={handleShow}
        size="30px"
        className="d-md-none ms-4 cursor"
      />
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fs-4 fw-semibold text-capitalize">
            {loggedInUser?.username ? `Hi ${loggedInUser?.username}` : "Footsy"}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {categories.map(({ _id, name }) => (
            <NavLink
              key={_id}
              to={`/products/${name.toLowerCase()}`}
              className={classnames({
                "d-flex flex-column fs-3 mb-3": true,
                "text-black fw-bold":
                  location.pathname === `/products/${name.toLowerCase()}`,
              })}
              onClick={handleClose}
            >
              {name}
            </NavLink>
          ))}
          <hr />
          {loggedInUser && (
            <>
              <NavLink
                to={`/profile/${loggedInUser?.username}`}
                className={`profile fs-3 d-flex align-items-center ${
                  location.pathname === "/profile" ? "fw-bold" : ""
                }`}
                onClick={handleClose}
              >
                <GoPerson className="me-1" /> Profile
              </NavLink>
              <br />
              <NavLink
                to={`/orders`}
                className={`profile fs-3 d-flex align-items-center ${
                  location.pathname === "/orders" ? "fw-bold" : ""
                }`}
                onClick={handleClose}
              >
                <CiShoppingCart className="me-1" />
                Orders
              </NavLink>
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
              <NavLink
                to="/cart"
                className="fs-4 fw-medium"
                onClick={handleClose}
              >
                Cart
              </NavLink>
              <hr />
              <NavLink
                to="/login"
                className="fs-4 fw-medium mb-4"
                onClick={handleClose}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="fs-4 fw-medium mb-4"
                onClick={handleClose}
              >
                Register
              </NavLink>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
