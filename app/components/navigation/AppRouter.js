import React, { useContext } from "react";
import { View } from "react-native";
import { LoginContext } from "../context/LoginContext";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from ".";
import PrivateRoutes from "./PrivateRoutes";

const AppRouter = () => {
  const { user } = useContext(LoginContext);

  return (
    <>
      {user.logged ? <PrivateRoutes /> : <Navigation/>}
    </>
  );
};

export default AppRouter;
