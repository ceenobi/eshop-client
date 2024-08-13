import { Col, Container, Row } from "react-bootstrap";
import { ActionButton, Headings, ModalView, Texts } from "@/components";
import { useStore, useTitle } from "@/hooks";
import { formatDate, tryCatchFn } from "@/utils";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";
import { userService } from "@/api";

export default function Profile() {
  const { loggedInUser, logout, token } = useStore();
  const [modalShow, setModalShow] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  useTitle(`Your account ${loggedInUser?.username}`);
  const location = useLocation();

  const deleteUserAccount = tryCatchFn(async () => {
    setIsDeleting(true);
    const res = await userService.deleteAccount(token);
    if (res.status === 200) {
      logout();
      toast.success(res.data.msg);
    }
    setIsDeleting(false);
  });

  return (
    <div className="py-5">
      <Container fluid="xl" className="px-3">
        <Headings
          text={
            <>
              <span className="fw-bold text-black me-2">Hi,</span>
              {loggedInUser?.username}
            </>
          }
          color="var(--bg-zinc-600)"
          size="1.5rem"
          extra="text-capitalize"
        />
        <Row className="mt-4 justify-content-center">
          <Col md={2} lg={4}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <NavLink
                to="/profile"
                className={`profile
                  ${
                    location.pathname === "/profile"
                      ? "text-black"
                      : "text-secondary"
                  }`}
              >
                <Texts text="My Account" className="fw-bold" />
              </NavLink>
              <NavLink
                to="/profile/edit"
                className={`d-md-none profile ${
                  location.pathname === "/profile/edit"
                    ? "text-black"
                    : "text-secondary"
                }`}
              >
                <MdEdit size="24px" /> Edit
              </NavLink>
            </div>
            <NavLink
              to="/profile/edit"
              className={`profile d-none d-md-block ${
                location.pathname === "/profile/edit"
                  ? "text-black"
                  : "text-secondary"
              }`}
            >
              <Texts text="Edit Account" className="fw-bold" />
            </NavLink>
          </Col>
          <Col md={7} lg={5} className="mb-4">
            <div className="bg-light border rounded-4 shadow-sm p-3">
              <Texts text="Account Overview" className="fw-bold" />
              <div className="d-flex flex-wrap justify-content-between">
                <div>
                  <Texts
                    text="Username"
                    className="text-uppercase fw-medium mb-1"
                  />
                  <Texts text={loggedInUser?.username} />
                </div>
                <div>
                  <Texts
                    text="Email"
                    className="text-uppercase fw-medium mb-1"
                  />
                  <Texts text={loggedInUser?.email} color="var(--bg-zinc-700)" />
                </div>
              </div>
              <hr />
              <div className="d-flex flex-wrap justify-content-between">
                <Texts
                  text="Date registered:"
                  className="text-uppercase fw-medium mb-1"
                />

                <Texts
                  text={formatDate(loggedInUser?.createdAt)}
                  color="var(--bg-zinc-700)"
                />
              </div>
            </div>
          </Col>
          <Col md={3} className="mb-4">
            <div className="text-center text-lg-end">
              <ActionButton
                text="DELETE ACCOUNT"
                className="text-white w-75 p-2"
                type="button"
                variant="danger"
                onClick={() => setModalShow(true)}
              />
            </div>
          </Col>
        </Row>
        <Outlet />
      </Container>
      <ModalView
        show={modalShow}
        handleClose={() => setModalShow(false)}
        title="Delete account"
        backdrop="static"
      >
        <Texts
          text="You are about to permanently delete your account."
          className="fw-bold"
        />
        <Texts text="Deleting your account is permanent and cannot be reversed. Are you sure?" />
        <div className="d-flex justify-content-end align-items-center gap-3">
          <Texts
            text="Cancel"
            className="fw-bold cursor mt-3"
            role="button"
            onClick={() => setModalShow(false)}
          />
          <ActionButton
            text="DELETE ACCOUNT"
            pending={isDeleting}
            className="border-0 p-2"
            style={{
              fontSize: "14px",
              width: "170px",
              backgroundColor: "var(--bg-zinc-700)",
            }}
            onClick={deleteUserAccount}
          />
        </div>
      </ModalView>
    </div>
  );
}
