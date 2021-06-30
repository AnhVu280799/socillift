export default theme => ({
    infoIcon: {
        color: theme.colors.grey(1.0),
        marginLeft: '8px',
        '&:hover': {
            color: theme.colors.baseGrey(1.0)
        },
        cursor: 'pointer'
    },
    paper: {
        borderRadius: '3px',
        boxShadow: '0px 1px 4px 0 rgba(0, 0, 0, 0.14), 0px -1px 4px 0 rgba(0, 0, 0, 0.14)',
        backgroundColor: theme.colors.baseGrey(1.0),
        padding: '12px 17px 14px 17px'
    },
    popper: {}
})
