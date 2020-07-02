import {Button, withStyles} from '@material-ui/core';


export const StyledButton = withStyles({
    root: {
        type: "contained",
        color: "primary"
    }
})(Button);
