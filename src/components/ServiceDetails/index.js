import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import TitleCard from "./TitleCard";
import PricingDetails from "./PricingDetails";
import StyledTabs from "./StyledTabs";
import { useStyles } from "./styles";
import { serviceActions } from "../../Redux/actionCreators";

const sampleServiceData = {
  service_row_id: 67,
  org_id: "snet",
  service_id: "cntk-image-recon",
  price_model: "fixed_price",
  price_in_cogs: "1.00000000",
  pricing: '{"price_model": "fixed_price", "price_in_cogs": 1.00000000}',
  display_name: "CNTK Image Recognition",
  description: "This service uses CNTK Image Recognition to perform image recognition on photos of flowers and dogs.",
  url: "https://singnet.github.io/dnn-model-services/users_guide/cntk-image-recon.html",
  json: "",
  model_ipfs_hash: "QmY5xrjYHhmLtGKNXX6NcKjNvHqUjAo672MFTcLNfnEgMs",
  encoding: "proto",
  type: "grpc",
  mpe_address: "0x7E6366Fbe3bdfCE3C906667911FC5237Cc96BD08",
  payment_expiration_threshold: 40320,
  up_votes_count: 50,
  down_votes_count: 19,
  tags: [],
  is_available: 1,
};

class ServiceDetails extends Component {
  state = {
    service_row_id: "",
    service: sampleServiceData,
  };

  componentDidMount = () => {
    const service_row_id = this.props.match.params.service_row_id;
    if (!this.props.serviceList || this.props.serviceList.length === 0) {
      this.props.fetchService(this.props.pagination);
      return;
    }
    const service = this.props.serviceList.filter(el => el.service_row_id === Number(service_row_id))[0];
    this.setState({ service_row_id, service });
  };

  render() {
    const { classes } = this.props;
    const { service } = this.state;
    return (
      <Grid container spacing={24} className={classes.serviceDetailContainer}>
        <TitleCard org_id={service.org_id} display_name={service.display_name} />
        <PricingDetails price_model={service.price_model} />
        <StyledTabs service={service} />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  serviceList: state.serviceReducer.result,
  pagination: state.serviceReducer.pagination,
});

const mapDispatchToProps = dispatch => ({
  fetchService: pagination => dispatch(serviceActions.fetchService(pagination)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ServiceDetails));
