import React, { useRef } from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import UserProfilePopUpHeader from "./UserProfilePopUpHeader";
import UserMenu from "./UserMenu";
import { useStyles } from "./styles";
import useOutsideClick from "../Hooks/useOutsideClick";

const UserProfilePopUp = ({ classes, handleClick, nickname, email }) => {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, handleClick);

  return (
    <div ref={wrapperRef}>
      <div className={classes.UserProfilePopUpContainer}>
        <UserProfilePopUpHeader
          nickName={nickname}
          remainingCredits=""
          usedCredits=""
          onClose={handleClick}
          email={email}
        />
        <UserMenu handleClick={handleClick} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  nickname: state.userReducer.nickname,
  email: state.userReducer.email,
});

export default connect(mapStateToProps)(withStyles(useStyles)(UserProfilePopUp));
