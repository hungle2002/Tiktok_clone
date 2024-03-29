import PropTypes from "prop-types";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";

import styles from "./Menu.module.scss";
import { Wrapper as PopperWrapper } from "../";
import MenuItem from "./MenuItems";
import Header from "./Header";
import { useState } from "react";

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn }) {
  const [history, setHistory] = useState([{ data: items }]);

  const current = history[history.length - 1];

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          onClick={() => {
            if (isParent) {
              setHistory([...history, item.children]);
            } else {
              onChange(item);
            }
          }}
          data={item}
          key={index}
        />
      );
    });
  };

  const handleReturnToFirstPage = () => {
    setHistory((prev) => prev.slice(0, 1));
  };

  const handleReturnBack = () => {
    setHistory(history.slice(0, -1));
  };

  return (
    <Tippy
      offset={[12, 6]}
      delay={[0, 1000]}
      interactive={true}
      placement="bottom-end"
      hideOnClick={false}
      render={(attrs) => (
        <div className={cx("menu-items")} tabIndex={-1}>
          <PopperWrapper className={cx("menu-popper")}>
            {history.length > 1 && (
              <Header title={current.title} onBack={handleReturnBack} />
            )}
            <div className={cx("menu-scrollable")}>{renderItems()}</div>
          </PopperWrapper>
        </div>
      )}
      onHide={handleReturnToFirstPage}
    >
      {children}
    </Tippy>
  );
}

Menu.propTypes = {
  children: PropTypes.string.isRequired,
  onChange: PropTypes.array,
  items: PropTypes.func,
};

export default Menu;
