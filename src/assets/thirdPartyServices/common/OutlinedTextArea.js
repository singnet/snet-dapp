import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField/index";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";

class OutlinedTextArea extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.inputRef = React.createRef();
    }

    render() {
        const {id, label, name, value, helperTxt, rows, htmlTooltip, charLimit, onChange, ref} = this.props;

        return (
            <div style={{width: "100%"}}>

                {htmlTooltip ?
                    (<div style={{paddingTop: 29, textAlign: "right", width: "25px", float: "left"}}>
                            <Tooltip
                                title={
                                    <React.Fragment>
                                        {htmlTooltip}
                                    </React.Fragment>
                                }
                                placement="top"
                            >
                                <InfoIcon
                                    style={{
                                        color: "#D6D6D6",
                                        "&:hover": {color: "#008BF9",},
                                        verticalAlign: "middle"
                                    }}
                                />
                            </Tooltip>
                        </div>
                    ) : null
                }

                <div style={{
                    width: htmlTooltip ? `calc(100% - 25px)` : "100%",
                    float: htmlTooltip ? "right" : "none"
                }}
                >
                    <TextField
                        id={id}
                        inputRef={this.inputRef}
                        multiline
                        name={name}
                        value={value}
                        label={label ? label : null}
                        rows={rows ? rows : 4}
                        defaultValue=""
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={onChange}
                        helperText={helperTxt ? helperTxt : null}
                        inputProps={{maxLength: charLimit ? charLimit : 5000}}
                    />
                </div>
            </div>
        );
    }
}

OutlinedTextArea.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    rows: PropTypes.number,
    charLimit: PropTypes.number,
    helperTxt: PropTypes.string,
    onChange: PropTypes.func,
    htmlTooltip: PropTypes.instanceOf(Element),
    ref: PropTypes.any
};

export default OutlinedTextArea;
