import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPlus,
  faCoins,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import styles from "./Header.module.scss";
import images from "../../../../assets/images";
import Button from "../../../Button";
import Menu from "../../../Popper/Menu";
import {
  Messages,
  Inbox,
  Profile,
  Setting,
  English,
  Feedback,
  Keyboard,
  Logout,
} from "../../../icons";
import Image from "../../../Image";
import Search from "../Search";
import config from "../../../../config";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <English />,
    title: "English",
    children: {
      title: "Language",
      data: [
        {
          type: "language",
          code: "vi",
          title: "Vietnamese",
        },
        {
          type: "language",
          code: "en",
          title: "English",
        },
        {
          type: "language",
          code: "spa",
          title: "Spanish",
        },
        {
          type: "language",
          code: "por",
          title: "Portuguese",
        },
        {
          type: "language",
          code: "jp",
          title: "Japanese",
        },
        {
          type: "language",
          code: "china",
          title: "Chinese",
        },
        {
          type: "language",
          code: "tur",
          title: "Turkish",
        },
        {
          type: "language",
          code: "kor",
          title: "Korean",
        },
        {
          type: "language",
          code: "ita",
          title: "Italian",
        },
        {
          type: "language",
          code: "fre",
          title: "French",
        },
        {
          type: "language",
          code: "russ",
          title: "Russian",
        },
        {
          type: "language",
          code: "mara",
          title: "Marathi",
        },
        {
          type: "language",
          code: "ben",
          title: "Bengali",
        },
        {
          type: "language",
          code: "mchi",
          title: "Mandarin Chinese",
        },
        {
          type: "language",
          code: "por",
          title: "Portuguese",
        },
        {
          type: "language",
          code: "ychine",
          title: "Yue Chinese",
        },
      ],
    },
  },
  {
    icon: <Feedback />,
    title: "Feedback and Help",
    to: "/feedback",
  },
  {
    icon: <Keyboard />,
    title: "Keyboard shortcuts",
  },
];

// handle logic
const handleMenuChange = (menuItem) => {
  switch (menuItem.type) {
    case "language":
      // handlechange
      break;
    default:
  }
};

function Header() {
  const currentUser = true;

  // set menu when user login
  const userMenu = [
    {
      icon: <Profile />,
      title: "View Profile",
      to: "/hungle",
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: "Get Coins",
      to: "/coin",
    },
    {
      icon: <Setting />,
      title: "Setting",
      to: "/setting",
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faMoon} />,
      title: "Dark Mode",
      to: "/setting",
    },
    {
      icon: <Logout />,
      title: "Log out",
      to: "/logout",
      separate: true,
    },
  ];

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Link to={config.routes.home} className={cx("logo")}>
          <img src={images.logo} alt="tiktok logo" />
        </Link>
        <div>
          <Search />
        </div>
        <div className={cx("action")}>
          <Button
            className={cx("upload-button")}
            text
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
          >
            Upload
          </Button>
          {currentUser ? (
            <>
              <Tippy delay={[0, 300]} content="Messages" placement="bottom">
                <button className={cx("action-btn")}>
                  <Messages className="" />
                </button>
              </Tippy>
              <Tippy delay={[0, 300]} content="Inbox" placement="bottom">
                <div>
                  <button className={cx("action-btn")}>
                    <Inbox className="" />
                    <span className={cx("badges")}>12</span>
                  </button>
                </div>
              </Tippy>
            </>
          ) : (
            <>
              <Button primary>Log in</Button>
            </>
          )}
          <Menu
            items={currentUser ? userMenu : MENU_ITEMS}
            onChange={handleMenuChange}
          >
            {currentUser ? (
              <div>
                <Image
                  src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/5e37ff4da73ba2fad83dd7728cfee477~c5_100x100.jpeg?x-expires=1678460400&x-signature=N96z0ilFJcpiczfuHZ%2BlS104f00%3D"
                  alt="avatar"
                  className={cx("user-avatar")}
                  fallBack="https://vtv1.mediacdn.vn/thumb_w/650/2022/9/20/18-maguire-1663660369116981603469-crop-16636603735531227908950-crop-16751738899741999117299.jpg"
                />
              </div>
            ) : (
              <div>
                <button className={cx("more-btn")}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
              </div>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
