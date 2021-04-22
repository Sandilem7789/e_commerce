import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    root: {
        maxWidth: "100%",
        backgroundColor: "black"
    },
    media: {
        height: 0,
        paddingTop: "56.25%", //16:9 ratio
    },
    img: {
        height: 0,
        paddingTop: "56.25%", //16:9 ratio
    },
    cardActions: {
        display: "flex",
        justifyContent: "flex-end"
    },
    cardContent: {
        display: "flex",
        justifyContent: "space-between"
    }
}));