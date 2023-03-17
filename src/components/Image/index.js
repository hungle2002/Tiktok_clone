import PropTypes from 'prop-types'
import { useState, forwardRef } from "react";
import images from "../../assets/images";
import styles from "./Image.module.scss";
import classNames from "classnames";

const Image = forwardRef(
  (
    {
      src,
      alt,
      className,
      fallBack: fallBackCustom = images.noImage,
      ...props
    },
    ref
  ) => {
    const [fallBack, setFallBack] = useState("");

    const handleError = () => {
      setFallBack(fallBackCustom);
    };

    return (
      <img
        className={classNames(styles.wrapper, className)}
        ref={ref}
        {...props}
        src={fallBack || src}
        alt={alt}
        onError={handleError}
      />
    );
  }
);

Image.propTypes  = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fallBack: PropTypes.string
}

export default Image;
