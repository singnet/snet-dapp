import React, { useCallback } from "react";

import { withStyles } from "@material-ui/styles";
import Gallery from "react-photo-gallery";
// import Carousel, { ModalGateway, Modal } from "react-images";

import Image from "./Image";
import Video from "./Video";
import { useStyles } from "./styles";

const MediaGallery = ({ classes }) => {
  // const [currentImage, setCurrentImage] = useState(0);
  // const [viewerIsOpen, setViewerIsOpen] = useState(false);

  // const openLightbox = useCallback((event, { photo, index }) => {
  //   console.log("@@@@@@");
  //   setCurrentImage(index);
  //   setViewerIsOpen(true);
  // }, []);

  // const closeLightbox = () => {
  //   setCurrentImage(0);
  //   setViewerIsOpen(false);
  // };

  const photos = [
    {
      src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
      width: 4,
      height: 3,
      //...loadImage("https://source.unsplash.com/2ShvY8Lf6l0/800x599")
    },
    {
      src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
      width: 1,
      height: 1,
    },
    {
      src: "https://www.youtube.com/embed/lTxn2BuqyzU",
      width: 1,
      height: 1,
      type: "video",
      source: "youtube",
    },
    {
      src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
      width: 1,
      height: 1,
    },
    {
      src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
      width: 1,
      height: 1,
    },
    {
      src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
      width: 4,
      height: 3,
    },
    {
      src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
      width: 3,
      height: 4,
    },
    {
      src: "https://source.unsplash.com/PpOHJezOalU/800x599",
      width: 4,
      height: 3,
    },
    {
      src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
      width: 4,
      height: 3,
    },
  ];

  // const enhancedPhotos = photos.map(async photo => {
  //   if (photo.type === "video") {
  //     return photo;
  //   }
  //   const { width, height } = await loadImage(photo.src);
  //   return { ...photo, width, height };
  // });

  const imageRenderer = useCallback(arg => {
    const { index, left, top, key, photo } = arg;
    return photo.type === "video" ? (
      <Video
        src={photo.src}
        margin="2px"
        index={index}
        photo={photo}
        left={left}
        top={top}
        showOverlay={index === 3}
        totalLength={photos.length}
      />
    ) : (
      <Image
        key={key}
        margin="2px"
        index={index}
        photo={photo}
        left={left}
        top={top}
        showOverlay={index === 3}
        totalLength={photos.length}
      />
    );
  });

  return (
    <div className={classes.mediaGalleryContainer}>
      <h2>Media Gallery (8)</h2>
      <div>
        <Gallery photos={photos.slice(0, 4)} renderImage={imageRenderer} />
        {/* <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={photos.map(x => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title,
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway> */}
      </div>
    </div>
  );
};

export default withStyles(useStyles)(MediaGallery);
