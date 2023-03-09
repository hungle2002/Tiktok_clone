import Headless from "@tippyjs/react/headless";
import { useEffect, useState, useRef } from "react";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountItem from "../../../AccountItem";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { Wrapper as PopperWrapper } from "../../../Popper";

const cx = classNames.bind(styles);

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  // handle logic
  const handleClear = () => {
    setSearchText("");
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHide = () => {
    setShowResult(false);
  };

  // not show popper
  useEffect(() => {
    if (!searchText.trim()) {
      setSearchResult([]);
      return;
    }
    setLoading(true);
    fetch(
      `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(
        searchText
      )}&type=less`
    )
      .then((result) => result.json())
      .then((items) => {
        setSearchResult(items.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchText]);

  return (
    <Headless
      visible={searchResult.length > 0 && showResult}
      interactive={true}
      render={(attrs) => (
        <div className={cx("search-result")} tabIndex={-1}>
          <PopperWrapper>
            <h4 className={cx("search-title")}>Accounts</h4>
            {searchResult.map((res) => (
              <AccountItem key={res.id} res={res} />
            ))}
          </PopperWrapper>
        </div>
      )}
      onClickOutside={handleHide}
    >
      <div className={cx("search")}>
        <input
          ref={inputRef}
          placeholder="Search accounts and videos..."
          spellCheck={false}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onFocus={() => {
            setShowResult(true);
          }}
        />
        {!!searchText && !loading && (
          <button className={cx("clear")} onClick={handleClear}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}
        {/* Loading */}
        {loading && (
          <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
        )}
        <button className={cx("search-btn")}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </Headless>
  );
}

export default Search;
