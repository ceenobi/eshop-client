import { useStore } from "@/hooks";
import { IoLogOut } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import classnames from "classnames";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { Badge, Container, Dropdown } from "react-bootstrap";
import { GiWingfoot } from "react-icons/gi";
import { GoPerson } from "react-icons/go";
import Drawer from "./Drawer";

export default function Nav() {
  const { categories, cartQuantity, loggedInUser, logout } = useStore();
  const location = useLocation();

  return (
    <Container fluid="xl" className="p-3 d-flex align-items-center">
      <NavLink to="/" className="me-4">
        <div className="d-flex align-items-center gap-1">
          <GiWingfoot size="30px" color="#3f3f46" />
          <span className="fs-5 fw-medium"> Footsy</span>
        </div>
      </NavLink>
      <div className="mx-lg-5 d-flex align-items-center gap-4 flex-grow-1">
        {categories.map(({ _id, name }) => (
          <NavLink
            key={_id}
            to={`/products/${name.toLowerCase()}`}
            className={classnames({
              " d-none d-md-flex": true,
              "text-black fw-bold":
                location.pathname === `/products/${name.toLowerCase()}`,
            })}
          >
            {name}
          </NavLink>
        ))}
      </div>
      <div className="d-flex align-items-center gap-4">
        <NavLink to="/search">
          <CiSearch size="22px" />
        </NavLink>

        {loggedInUser ? (
          <Dropdown className="d-none d-md-block">
            <Dropdown.Toggle
              variant="none"
              id="dropdown-basic"
              className="text-capitalize"
            >
              Hi, {loggedInUser?.username}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.ItemText className="fw-bold small">
                Hi, {loggedInUser?.username}
              </Dropdown.ItemText>
              <Dropdown.Item as={NavLink} to="/profile">
                <GoPerson className="me-1" /> Profile
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to={`/orders`}>
                <CiShoppingCart className="me-1" />
                Orders
              </Dropdown.Item>
              <Dropdown.ItemText onClick={logout} className="cursor">
                <IoLogOut className="me-1" /> Logout
              </Dropdown.ItemText>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <NavLink to="/login" className="d-none d-md-block">
            <GoPerson size="22px" />
          </NavLink>
        )}
        <NavLink to="/cart" className="position-relative">
          <CiShoppingCart size="22px" />
          {cartQuantity > 0 && (
            <Badge
              pill
              bg="black"
              className="position-absolute"
              style={{ top: "12px", left: "8px", fontSize: "10px" }}
            >
              {cartQuantity}
            </Badge>
          )}
        </NavLink>
      </div>
      <Drawer />
    </Container>
  );
}
