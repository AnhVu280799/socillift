export default theme => ({
    mainDiv: {
        textAlign: "center",
        width: "100%",
        padding: theme.defaultContentPadding,
        overflow: 'auto',
        minHeight: "300px"
    },
    collectionCard: {
        width: '100%',
        borderRadius: '6px',
        boxShadow: '0px 1px 4px 0 rgba(0, 0, 0, 0.14)',
        backgroundColor: '#ffffff',
        margin: '24px 0 0 0',
    },
    leftColumn: {
        ...theme.font.default,
        width: '100%',
        padding: '22px 0 20px 20px',
        textAlign: 'left',
    },
    collectionName: {
        fontSize: '26px',
        padding: '0 0 6px 0',
        fontWeight: 'bold',
        maxWidth: '700px',
        lineHeight: '1.5',
        wordWrap: 'break-word',
    },
    collectionOwner: {
        padding: '8px 0 7px 0',
        fontSize: '14px',
        lineHeight: '1.5',
        color: theme.colors.grey(1.0),
    },
    collectionInfo: {
        color: theme.colors.baseGrey(1.0),
    },
    collectionDesctiption: {
        fontSize: '14px',
        lineHeight: '1.5',
        color: theme.colors.baseGrey(1.0),
        padding: '8px 0 6px 0',
    },
    totalItem: {
        padding: '13px 0 10px 0',
        fontSize: '18px',
        fontWeight: '600',
        color: theme.colors.baseGrey(1.0),
    },
    rightColumn: {
        ...theme.font.default,
        padding: '21px 17px 0 0',
        textAlign: 'right',
    },
    shareInfo: {
        padding: '0 0 8px 0',
        justifyContent: 'flex-end',
    },
    shareWith: {
        color: theme.colors.grey(1.0),
    },
    shareUserInfo: {
        fontWeight: 'bold',
        color: theme.colors.primary(1.0),
    },
    toolTipShareUser: {
        margin: '0',
        padding: '0',
        fontSize: "14px",
        textAlign: "right",
        fontWeight: 'bold',
        color: theme.colors.primary(1.0),
    },
    buttonWrapper: {
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        width: '100%',
        alignItems: 'center',
    },
    buttonExport: {
        margin: '0 5px 0 0',
        height: '40px',
        justifyContent: 'center',
        padding: '0 16px !important',
    },
    buttonShare: {
        margin: '0 5px 0 0',
        height: '40px',
        justifyContent: 'center',
        padding: '0 16px !important',
    },
    moreActionWrapper: {
        height: '40px',
        padding: '0',
        justifyContent: 'center',
    },
    searchBar: {
        padding: '30px 0 0 0',
    },
    textField: {
        ...theme.font.default,
        color: theme.colors.baseGrey(),
        lineHeight: "20px",
        height: "40px",
        fontSize: "14px",
        marginBottom: "16px",
        textAlign: 'left',
        '&:after': {
            borderBottom: `2px solid ${theme.colors.primary(1.0)}`,
            left: 0,
            bottom: 0,
            // Doing the other way around crash on IE 11 "''" https://github.com/cssinjs/jss/issues/242
            content: '""',
            position: 'absolute',
            right: 0,
            transform: 'scaleX(0)',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shorter,
                easing: theme.transitions.easing.easeOut,
            }),
            pointerEvents: 'none', // Transparent to the hover style.
        },
        '&$focused:after': {
            transform: 'scaleX(1)'
        },
        '&$error:after': {
            borderBottomColor: theme.colors.warning(),
            transform: 'scaleX(1)', // error is always underlined in red
        },
        '&:before': {
            borderBottom: `1px solid ${theme.colors.greyLighter()}`,
            left: 0,
            bottom: 0,
            // Doing the other way around crash on IE 11 "''" https://github.com/cssinjs/jss/issues/242
            content: '"\\00a0"',
            position: 'absolute',
            right: 0,
            transition: theme.transitions.create('border-bottom-color', {
                duration: theme.transitions.duration.shorter,
            }),
            pointerEvents: 'none', // Transparent to the hover style.
        },
        // '&:hover:not($disabled):not($focused):not($error):before': {
        //     borderBottom: `2px solid ${theme.colors.primary()} !important`,
        //     // Reset on touch devices, it doesn't add specificity
        //     '@media (hover: none)': {
        //         borderBottom: `1px solid ${theme.colors.primary()}`,
        //     },
        // },
        '&$disabled:before': {
            color: `${theme.colors.baseGrey()} !important` ,
            borderBottom: `1px dotted ${theme.colors.greyLighter()} !important`,
        }
    },
    textFieldHover: {
        '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottom: `2px solid ${theme.colors.primary()} !important`,
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                borderBottom: `1px solid ${theme.colors.primary()}`,
            },
        },
    },
    influencerCard: {
        padding: "0 16px !important"
    },
    resultsContainer: {
        minHeight: "255px"
    },
    searchBarGridItem: {
        '& > div': {
            margin: 'inherit',
            paddingTop: 0,
        }
    }
})