import React from "react";
import { BgContainer, StartButton } from "./Welcome";
import welcomeImage from "../../images/landing.jpg";

const Welcome = () => {
  return (
    <BgContainer>
      <img src={welcomeImage} alt="dogs-breeds" />
      <StartButton href="/home">Click here and you know the breeds of dogs!</StartButton>
    </BgContainer>
  );
};

export default Welcome;
