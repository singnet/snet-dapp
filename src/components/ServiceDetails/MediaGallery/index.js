import React from "react";
import Masonry from "react-masonry-css";
// import { XMasonry, XBlock } from "react-xmasonry";

import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const MediaGallery = ({ classes }) => {
  let items = [
    { id: 1, name: "My First Item" },
    { id: 2, name: "Another item" },
    { id: 3, name: "Third Item" },
    { id: 4, name: "Here is the Fourth" },
    { id: 5, name: "High Five" },
  ];

  items = items.map(item => {
    return <div key={item.id}>{item.name}</div>;
  });

  return (
    <div className={classes.mediaGalleryContainer}>
      <h2>Media Gallery (8)</h2>
      <Masonry breakpointCols={3} className={classes.masonry_grid} columnClassName={classes.masonry_grid_column}>
        {items}
      </Masonry>

      {/* <XMasonry>
        <XBlock>
          <div className={classes.card}>
            <h1>Simple Card</h1>
             <p>Any text!</p>
          </div>
        </XBlock>
        <XBlock>
        <div className={classes.card}>
            <h1>Wider card</h1>
            <p>Any text!</p>
          </div>
        </XBlock>
        <XBlock>
        <div className={classes.card}>
            <h1>Wider card 2</h1>
            <p>Any text!</p>
          </div>
        </XBlock>
        <XBlock>
        <div className={classes.card}>
            <h1>Wider card 3</h1>
            <p>Any text!</p>
          </div>
        </XBlock>
    </XMasonry> */}
    </div>
  );
};

export default withStyles(useStyles)(MediaGallery);
