import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faEllipsisVertical,
  faMagnifyingGlass,
  faPlus,
  faSpinner,
  faCoins,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import Headless from "@tippyjs/react/headless";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import styles from "./Header.module.scss";
import images from "../../../../assets/images";
import { Wrapper as PopperWrapper } from "../../../Popper";
import AccountItem from "../../../AccountItem";
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
  const [searchResult, setSearchResult] = useState([]);
  const currentUser = true;

  // not show popper
  useEffect(() => {
    setTimeout(() => {
      setSearchResult([]);
    }, 0);
  });

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
        <div className={cx("logo")}>
          <img src={images.logo} alt="tiktok logo" />
        </div>
        <Headless
          visible={searchResult.length > 0}
          interactive={true}
          render={(attrs) => (
            <div className={cx("search-result")} tabIndex={-1}>
              <PopperWrapper>
                <h4 className={cx("search-title")}>Accounts</h4>
                <AccountItem />
                <AccountItem />
                <AccountItem />
              </PopperWrapper>
            </div>
          )}
        >
          <div className={cx("search")}>
            <input
              placeholder="Search accounts and videos..."
              spellCheck={false}
            />
            <button className={cx("clear")}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            {/* Loading */}
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />

            <button className={cx("search-btn")}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </Headless>

        <div className={cx("action")}>
          <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>
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
                <button className={cx("action-btn")}>
                  <Inbox className="" />
                </button>
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
              <>
                <button className={cx("more-btn")}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
              </>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
