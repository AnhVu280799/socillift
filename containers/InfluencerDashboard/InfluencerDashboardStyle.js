export default theme => ({
    mainDiv: {
        textAlign: "center",
        width: "100%",
        padding: theme.defaultContentPadding,
        overflow: 'visible'
    },
    tabs: {
        '&:after': {
            backgroundColor: theme.colors.greyLight(1.0),
            height: '1px',
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 40,
            width: '100%'
        },
        position: 'relative',
        marginTop: '-9px',
        marginLeft: '-40px'
    },
    tabsIndicator: {
        backgroundColor: theme.colors.primary(1.0),
        height: '3px'
    },
    tabLabelContainer: {
        padding: '0',
        paddingBottom: '6px'
    },
    tabRoot: {
        minWidth: '0',
        ...theme.font.default,
        color: theme.colors.grey(1.0),
        fontSize: '26px',
        lineHeight: '39px',
        fontWeight: 'bold',
        marginLeft: '40px',
        textTransform: 'none',
        '&:hover': {
            color: theme.colors.baseGrey(1.0)
        }
    },
    selectedTab: {
        color: theme.colors.primary(1.0),
        '&:hover': {
            color: theme.colors.primary(1.0)
        }
    }
})