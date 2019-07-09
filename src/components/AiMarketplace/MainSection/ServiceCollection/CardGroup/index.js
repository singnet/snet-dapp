import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";

import ListView from "./ListView";
import StyledCard from "./StyledCard";
import CardImg from "../../../../../assets/images/dummy-card.png";
import { useStyles } from "./styles";

const CardGroup = props => {
    const classes = useStyles();
    return (
        <div className={classes.cardCollection}>
            <StyledCard
                cardMedia={CardImg}
                cardTitle="Text Analysis"
                cardSubheader="Summarize URL"
                ratingGiven="3.0"
                totalRating="(1500)"
                cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
            />
            <StyledCard
                cardMedia={CardImg}
                cardTitle="Text Analysis"
                cardSubheader="Summarize URL"
                ratingGiven="3.0"
                totalRating="(1500)"
                cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
            />
            <StyledCard
                cardMedia={CardImg}
                cardTitle="Text Analysis"
                cardSubheader="Summarize URL"
                ratingGiven="3.0"
                totalRating="(1500)"
                cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
            />
            <StyledCard
                cardMedia={CardImg}
                cardTitle="Text Analysis"
                cardSubheader="Summarize URL"
                ratingGiven="3.0"
                totalRating="(1500)"
                cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
            />
            <StyledCard
                cardMedia={CardImg}
                cardTitle="Text Analysis"
                cardSubheader="Summarize URL"
                ratingGiven="3.0"
                totalRating="(1500)"
                cardDescription="This is an AI algorithm for summarizing content in webpages.  Input a URL and you will get the text summary"
            />
        </div>
    );
};

export default withStyles(useStyles)(CardGroup);
