import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import { Wrapper as PopperWrapper } from "../";
import MenuItem from "./MenuItems";

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
  const renderItems = () => {
    return items.map((item, index) => <MenuItem data={item} key={index} />);
  };

  return (
    <Tippy
    visible
      delay={[0, 1000]}
      interactive={true}
      placement="bottom-end"
      render={(attrs) => (
        <div className={cx("menu-items")} tabIndex={-1}>
          <PopperWrapper className={cx("menu-popper")}>
            {renderItems()}
          </PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
