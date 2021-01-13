export const useStyles = theme => ({
  mediaGalleryContainer: {
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    padding: "0 25px 30px 0",
    marginTop: 25,
    borderRadius: 4,
    backgroundColor: theme.palette.text.white,
    "& iframe": { width: "100%" },
  },
  // marketplace_media_gallery:{
  //   '&.image-gallery-thumbnail.active, .image-gallery-thumbnail:hover, .image-gallery-thumbnail:focus':{
  //     border: '4px solid #4086ff'
  //   }
  // },
});
