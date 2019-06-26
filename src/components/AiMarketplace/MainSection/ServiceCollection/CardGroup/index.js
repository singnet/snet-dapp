import React from "react";

import ListView from "./ListView";
import CardImg from "../../../../../assets/images/dummy-card.png";
import { useStyles } from "./styles";

const CardGroup = ({ data }) => {
    const classes = useStyles();
    return (
        <div className={classes.cardCollection}>
            {data.map(item => (
                <ListView
                    cardMedia={CardImg}
                    cardTitle={item.org_id}
                    cardSubheader={item.display_name}
                    ratingGiven="3.0"
                    totalRating="(1500)"
                    cardDescription={item.description}
                />
            ))}
        </div>
    );
};

export default CardGroup;
