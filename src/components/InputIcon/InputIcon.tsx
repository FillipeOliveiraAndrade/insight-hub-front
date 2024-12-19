import { Icon } from "@phosphor-icons/react";
import React, { forwardRef } from "react";
import "./styles.css";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  Icon: Icon;
};

const InputIcon = forwardRef<HTMLInputElement, Props>(({ Icon, ...rest }, ref) => {
  return (
    <div className="input-container">
      <Icon
        size={18}
        weight="regular"
        color="#616161"
        className="icon"
      />
      <input
        ref={ref}
        className="input"
        {...rest}
      />
    </div>
  );
});

export default InputIcon;
