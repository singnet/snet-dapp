import React, { Component } from "react";

// components
import StyledCard from "./StyledCard/index.js";

//  card image
import CardImg from "../../../../../assets/images/dummy-card.png";

class CardGroup extends Component {
  render() {
    return (
      <div>
        <StyledCard
          cardTitle="Text Analysis"
          cardSubheader="Summarize URL"
          cardMedia={CardImg}
          ratingGiven="3.0"
          totalRating="(1500)"
          cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
        />
        <StyledCard
          cardTitle="Text Analysis"
          cardSubheader="Summarize URL"
          cardMedia={CardImg}
          ratingGiven="3.0"
          totalRating="(1500)"
          cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
        />
        <StyledCard
          cardTitle="Text Analysis"
          cardSubheader="Summarize URL"
          cardMedia={CardImg}
          ratingGiven="3.0"
          totalRating="(1500)"
          cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
        />
        <StyledCard
          cardTitle="Text Analysis"
          cardSubheader="Summarize URL"
          cardMedia={CardImg}
          ratingGiven="3.0"
          totalRating="(1500)"
          cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
        />
        <StyledCard
          cardTitle="Text Analysis"
          cardSubheader="Summarize URL"
          cardMedia={CardImg}
          ratingGiven="3.0"
          totalRating="(1500)"
          cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
        />
        <StyledCard
          cardTitle="Text Analysis"
          cardSubheader="Summarize URL"
          cardMedia={CardImg}
          ratingGiven="3.0"
          totalRating="(1500)"
          cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
        />
      </div>
    );
  }
}

export default CardGroup;
