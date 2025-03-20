"use client";

import { useState, useEffect } from "react";
import Switch from "react-switch";
import Image from "next/image";

import Sun from "./assets/sun.svg"
import Moon from "./assets/Moon.svg"

export default function SwitchTheme() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      // Dark mode styles
      document.documentElement.style.setProperty("--BackgroundColor", "#181A2A");
      document.documentElement.style.setProperty("--blacky", "white");
      document.documentElement.style.setProperty("--greyish", "#52525b50");
      document.documentElement.style.setProperty("--greyishCardShadow", "#4b6bfb2c");
    } else {
      // Light mode styles
      document.documentElement.style.setProperty("--BackgroundColor", "white");
      document.documentElement.style.setProperty("--blacky", "black");
      document.documentElement.style.setProperty("--greyish", "#52525b10");
      document.documentElement.style.setProperty("--greyishCardShadow", "#52525b10");
    }
  }, [checked]); // Runs whenever `checked` changes

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <label htmlFor="theme-switch">
      <Switch
        checked={checked}
        onChange={handleChange}
        handleDiameter={28}
        offColor="#E8E8EA"
        onColor="#4B6BFB"
        // offHandleColor="#0ff"
        // onHandleColor="#52525b"
        height={38}
        width={75}
        borderRadius={18}
        // activeBoxShadow="0px 0px 1px 2px #fffc35"
        uncheckedIcon={
          <div
            style={{
              display: "none", //hide the text 
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            //   fontSize: 15,
              color: "var(--blacky)",
              paddingRight: 2,
            }}
          >
            Off
          </div>
        }
        checkedIcon={
          <svg style={{display: 'none'}} viewBox="0 0 10 10" height="100%" width="100%" fill="yellow">
            <circle r={3} cx={5} cy={5} />
          </svg>
        }
        uncheckedHandleIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Image src={Sun} alt="sun"></Image>
          </div>
        }
        checkedHandleIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "red",
              fontSize: 18,
            }}
          >
            <Image src={Moon} width={18} height={18} alt="moon"></Image>
          </div>
        }
        className="react-switch"
        id="theme-switch"
      />
    </label>
  );
}
