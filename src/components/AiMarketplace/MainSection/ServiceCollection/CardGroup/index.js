import React, { Component } from "react";

// material ui imports
import { withStyles } from "@material-ui/styles";

// components
import StyledCard from "./StyledCard/index.js";
import ListView from "./ListView/index.js";

//  card image
import CardImg from "../../../../../assets/images/dummy-card.png";

const useStyles = theme => ({
  cardCollection: {
    marginTop: 20
  }
});

class CardGroup extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.cardCollection}>
        <ListView
          cardTitle="Text Analysis"
          cardSubheader="Summarize URL"
          ratingGiven="3.0"
          totalRating="(1500)"
          cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
        />
        <ListView
          cardTitle="Text Analysis"
          cardSubheader="Summarize URL"
          ratingGiven="3.0"
          totalRating="(1500)"
          cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
        />
        <ListView
          cardTitle="Text Analysis"
          cardSubheader="Summarize URL"
          ratingGiven="3.0"
          totalRating="(1500)"
          cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
        />
        <ListView
          cardTitle="Text Analysis"
          cardSubheader="Summarize URL"
          ratingGiven="3.0"
          totalRating="(1500)"
          cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
        />
        <ListView
          cardTitle="Text Analysis"
          cardSubheader="Summarize URL"
          ratingGiven="3.0"
          totalRating="(1500)"
          cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(CardGroup);

// <StyledCard
//   cardTitle="Text Analysis"
//   cardSubheader="Summarize URL"
//   cardMedia={CardImg}
//   ratingGiven="3.0"
//   totalRating="(1500)"
//   cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
// />
// <StyledCard
//   cardTitle="Text Analysis"
//   cardSubheader="Summarize URL"
//   cardMedia={CardImg}
//   ratingGiven="3.0"
//   totalRating="(1500)"
//   cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
// />
// <StyledCard
//   cardTitle="Text Analysis"
//   cardSubheader="Summarize URL"
//   cardMedia={CardImg}
//   ratingGiven="3.0"
//   totalRating="(1500)"
//   cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
// />
// <StyledCard
//   cardTitle="Text Analysis"
//   cardSubheader="Summarize URL"
//   cardMedia={CardImg}
//   ratingGiven="3.0"
//   totalRating="(1500)"
//   cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
// />
// <StyledCard
//   cardTitle="Text Analysis"
//   cardSubheader="Summarize URL"
//   cardMedia={CardImg}
//   ratingGiven="3.0"
//   totalRating="(1500)"
//   cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
// />
// <StyledCard
//   cardTitle="Text Analysis"
//   cardSubheader="Summarize URL"
//   cardMedia={CardImg}
//   ratingGiven="3.0"
//   totalRating="(1500)"
//   cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
// />
