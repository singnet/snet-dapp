import React, { Component } from "react";

// components
import StyledCard from "./StyledCard/index.js";

//  card image
import CardImg from "../../../../../assets/images/dummy-card.png";

class CardGroup extends Component {
  render() {
    const { data } = this.props;
    console.log('card group', data)
    return (
      <div>
        {data.map(value => (
          <StyledCard
            cardTitle="Text Analysis"
            cardSubheader={value.display_name}
            cardMedia={CardImg}
            ratingGiven="3.0"
            totalRating="(1500)"
            cardDescription={value.description}
          />
        ))}

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
