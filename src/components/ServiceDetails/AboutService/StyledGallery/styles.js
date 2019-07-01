export const useStyles = theme => ({
    galleryContainer: {
        boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
        borderRadius: 4,
        marginTop: 30,
        backgroundColor: theme.palette.text.white,
        "& h3": {
            padding: "11px 22px",
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
            borderBottomColor: theme.palette.text.gray1,
            margin: 0,
            color: theme.palette.text.darkShadedGray,
            fontSize: 20,
        },
    },
    gallery: {
        padding: "10px 57px 30px",
        "& .image-gallery-content": {
            overflow: "hidden",
        },
        "& .image-gallery-slide-wrapper": {
            height: 172,
            marginBottom: 5,
        },
        "& .image-gallery-thumbnails-container": {
            display: "flex",
            "& a": { marginRight: 4 },
        },
    },
});
