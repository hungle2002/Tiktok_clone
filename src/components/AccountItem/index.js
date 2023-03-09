import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import Image from "../Image";

const cx = classNames.bind(styles);

function AccountItem({ res }) {
  return (
    <Link to={`/@${res.nickname}`} className={cx("wrapper")}>
      <Image className={cx("avatar")} src={res.avatar} alt="" />
      <div className={cx("info")}>
        <h4 className={cx("name")}>
          <span>{res.full_name}</span>
          {res.tick && (
            <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
          )}
        </h4>
        <span className={cx("username")}>{res.nickname}</span>
      </div>
    </Link>
  );
}

export default AccountItem;
