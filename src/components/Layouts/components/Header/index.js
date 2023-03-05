import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faEllipsisVertical,
  faMagnifyingGlass,
  faPlus,
  faSpinner,
  faEarthAsia,
  faQuestionCircle,
  faKeyboard,
  faCloudUpload,
  faUser,
  faCoins,
  faGear,
  faMoon,
  faSignOut,
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

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
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
    icon: <FontAwesomeIcon icon={faQuestionCircle} />,
    title: "Feedback and Help",
    to: "/feedback",
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
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
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "View Profile",
      to: "/hungle",
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: "Get Coins",
      to: "/coin",
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
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
      icon: <FontAwesomeIcon icon={faSignOut} />,
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
          {currentUser ? (
            <>
              <Tippy delay={[0, 300]} content="Upload video" placement="bottom">
                <button className={cx("action-btn")}>
                  <FontAwesomeIcon icon={faCloudUpload} />
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                Upload
              </Button>
              <Button primary>Log in</Button>
            </>
          )}
          <Menu
            items={currentUser ? userMenu : MENU_ITEMS}
            onChange={handleMenuChange}
          >
            {currentUser ? (
              <div>
                <img
                  src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/af92991e8ef8dfb93a0dadc167ff8f82~c5_100x100.jpeg?x-expires=1678204800&x-signature=d%2BnwBawo%2BxH%2BFvBbbJK%2FLtlVRfw%3D"
                  alt="avatar"
                  className={cx("user-avatar")}
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
