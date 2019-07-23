export const useStyles = theme => ({
  userMenuItemList: {
    padding: 0,
    margin: 0,
    "& li": {
      listStyle: "none",
      padding: "10px 20px",
      '& a':{
        width: '100%',
        display: 'inline-block',
        '&:hover': {
          '& span':{ 
            color: theme.palette.text.primary 
          }
        }
      },
      "& span": {
        color: theme.palette.text.userProfileIconColor,
        verticalAlign: "middle",
        paddingRight: 15,
        '&:hover':{ color: theme.palette.text.primary }
      },
    "& hr": { margin: "10px 0" },
    '&:last-of-type':{ paddingBottom: 17 }
    },
  },
  title:{
    color: theme.palette.text.black1,
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: "28px",
    textDecoration: "none",
    '&:hover':{ color: theme.palette.text.primary }
  },
  UserMenuAction: {
    cursor: "pointer",
    '&:hover':{
      '& span':{ 
        color: theme.palette.text.primary 
      }
    }
  },
});
