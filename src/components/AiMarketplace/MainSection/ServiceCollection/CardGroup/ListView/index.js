import React from "react";
import StarRatingComponent from "react-star-rating-component";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

import { useStyles } from "./styles";

const ListView = props => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader
                className={classes.cardHeader}
                classes={{
                    title: classes.cardTitle,
                }}
                title={props.cardTitle}
            />
            <CardContent className={classes.cardContent}>
                <div className={classes.ratingSection}>
                    <span className={classes.cardSubheader}>{props.cardSubheader}</span>
                    <StarRatingComponent
                        name="rate1"
                        starCount={5}
                        value={3}
                        starColor={"#FFC200"}
                        emptyStarColor={"rgba(161,163,168,0.35)"}
                        className={classes.ratingStars}
                    />
                    <span className={classes.ratedCount}>
                        {props.ratingGiven} {props.totalRating}
                    </span>
                </div>
                <Typography className={classes.cardTypograpy} component="p">
                    {props.cardDescription}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <IconButton aria-label="Settings" className={classes.showMore}>
                    <MoreVertIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default ListView;
