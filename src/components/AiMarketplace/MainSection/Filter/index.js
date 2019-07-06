import React from "react";
import { connect } from "react-redux";

import StyledExpansionPanel from "./StyledExpansionPanel.js";
import { useStylesHook } from "./styles";

let expansionData = {
  display_name: {
    title: "Display name",
    items: [],
  },
  org_id: {
    title: "Organization id",
    items: [],
  },
  tags: {
    title: "Tag name",
    items: [],
  },
};

const Filter = ({ services }) => {
  const classes = useStylesHook();
  if (services.length > 0) {
    services.map(service => {
      if (!expansionData.display_name.items.find(el => el.title === service.display_name)) {
        expansionData.display_name.items.push({ title: service.display_name });
      }
      if (!expansionData.org_id.items.find(el => el.title === service.org_id)) {
        expansionData.org_id.items.push({ title: service.org_id });
      }
      if (service.tags.length > 0) {
        expansionData.tags.map(tag => {
          expansionData.tags.items.push({ title: tag });
        });
      }
    });
  }

  return (
    <div className={classes.filterContainer}>
      <div className={classes.filterResetBtnContainer}>
        <h2 className={classes.h2}>Filters</h2>
        <button className={classes.resetBtn} type="reset" value="Reset">
          Reset
        </button>
      </div>
      <StyledExpansionPanel expansionData={Object.values(expansionData)} />
    </div>
  );
};

const mapStateToProps = state => ({
  services: state.serviceReducer.services,
});
export default connect(mapStateToProps)(Filter);
