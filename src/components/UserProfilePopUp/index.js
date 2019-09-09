import React, { useRef } from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import UserProfilePopUpHeader from "./UserProfilePopUpHeader";
import UserMenu from "./UserMenu";
import { useStyles } from "./styles";
import useOutsideClick from "../Hooks/useOutsideClick";

const UserProfilePopUp = ({ classes, handleClick, nickname }) => {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, handleClick);

  return (
    <div ref={wrapperRef}>
      <div className={classes.UserProfilePopUpContainer}>
        <UserProfilePopUpHeader nickName={nickname} remainingCredits="" usedCredits="" onClose={handleClick} />
        <UserMenu />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  nickname: state.userReducer.nickname,
});

export default connect(mapStateToProps)(withStyles(useStyles)(UserProfilePopUp));
