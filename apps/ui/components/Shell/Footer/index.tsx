import Image from "next/image";

import EpiAmOBlackLogo from "@/assets/epiamo-black.png";
import EpiAmOWhiteLogo from "@/assets/epiamo-white.png";
import fiocruzROLogo from "@/assets/fiocruz-ro.png";
import labioquimLogo from "@/assets/labioquim.png";
import UFSBDarkLogo from "@/assets/UFSBDark.jpg";
import UFSBWhiteLogo from "@/assets/UFSBWhite.jpg";
import { useIsDarkTheme } from "@/hooks/useIsDarkTheme";

import classes from "./Footer.module.css";

export function Footer() {
  const isDark = useIsDarkTheme();

  return (
    <div className={classes.makers}>
      <Image alt="" className={classes.makerImage128px} src={labioquimLogo} />
      <Image alt="" className={classes.makerImage96px} src={fiocruzROLogo} />
      <Image
        alt=""
        className={classes.makerImage96px}
        src={isDark ? EpiAmOWhiteLogo : EpiAmOBlackLogo}
      />
      <Image
        alt=""
        className={classes.makerImage128px}
        src={isDark ? UFSBDarkLogo : UFSBWhiteLogo}
      />
    </div>
  );
}
