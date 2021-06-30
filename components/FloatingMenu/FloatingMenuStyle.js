export default {
    item: {},
    itemText: {},
    itemLink: {},
    list: {},
    itemHover: {},
    itemActive: {},
    paper: {
        borderRadius: "6px",
        boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.14)",
        backgroundColor: "#ffffff",
        "&:before": {
            content: '""',
            position: "absolute",
            left: "-22px",
            top: "14px",
            width: "0",
            height: "0",
            border: "10.5px solid transparent",
            borderRight: "12px solid #ffffff",
        },
        overflow: "visible"
    }
}