import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";

import { useStyles } from "./styles";

const StyledDropdown = ({ labelTxt, list }) => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        featured: "",
    });

    const handleChange = name => event => {
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="featured-label">{labelTxt}</InputLabel>
            <Select
                native
                value={state.featured}
                onChange={handleChange("featured")}
                inputProps={{
                    name: "featured",
                    id: "featured-label",
                }}
            >
                <option value="" />
                {list.map(item => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};

StyledDropdown.propTypes = {
    labelTxt: PropTypes.string,
    list: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.string,
        })
    ),
};

StyledDropdown.defaultProps = {
    list: [{ value: 10, label: "Ten" }, { value: 20, label: "Twenty" }, { value: 30, label: "Thirty" }],
};

export default StyledDropdown;
