import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useEffect } from "react";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //3. If there is No authenticated user, redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  //3. While Loading , show a spinner
  if (isLoading) {
    return (
      //full page to center the spinner
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }
  //4. If there is auser, render the app
  if (isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;
