import React from "react";
import Button from "@material-ui/core/Button";
import { Grid, IconButton, MuiThemeProvider, Tooltip } from "@material-ui/core";
import { MinecraftizingService } from "./MinecraftizingService_pb_service";
import MethodNamesDropDown from "../../common/MethodNamesDropDown";
import StyledDropdown from "../../../../components/common/StyledDropdown/index"
import SNETImageUpload from "../../standardComponents/SNETImageUpload";
import { useStyles } from "./styles";
import { withStyles } from "@material-ui/styles";

const htstyle = {
    padding: "10px",
    fontSize: "13px",
    marginLeft: "10px"
};

const imgstyle = {
    maxWidth: "512px",
    maxHeight: "512px"
};

const initialUserInput = {
    methodName: "Select a value",
    model_name: "default",
    dataset: "default",
    input_image: undefined
};

const buttonStyle = {
    fontSize: "13px",
    marginLeft: "10px"
};

function repeatedButton (hrf, data)
{
    return (
        <Button target="_blank" href={hrf} style={buttonStyle}>
            <ul>{data}</ul>
        </Button>
    );
}

function styledDropdownWrap (name, list, value, onchange, class_name)
{
    return (
        <div className="row">
            <div style={htstyle}>
                {name}
            </div>
            <div className={class_name}>
                <StyledDropdown
                    list={list}
                    value={value}
                    onChange={onchange}
                />
            </div>
        </div>
    );
}

class MinecraftService extends React.Component {
    constructor(props) {
        super(props);
        this.submitAction = this.submitAction.bind(this);
        this.handleFormUpdate = this.handleFormUpdate.bind(this);
        this.getImageData = this.getImageData.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleDatasetChange = this.handleDatasetChange.bind(this);

    this.state = {
        ...initialUserInput,
        users_guide: "https://github.com/singnet/semantic-vision/blob/master/services/MinecraftService/README_service.md",
        code_repo: "https://github.com/singnet/semantic-vision/tree/master/services/MinecraftService",
        response: undefined,
    };
    }

    canBeInvoked() {
        return this.state.input_image && this.state.model_name !== "default" && this.state.dataset !== "default"
            && this.state.methodName !== "Select a value";
    }

    handleFormUpdate(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleModelChange (event) {
        const { value } = event.target;
        this.setState({model_name: value})
    }

    handleDatasetChange (event) {
        const { value } = event.target;
        this.setState({dataset: value})
    }

    submitAction() {
        const { methodName, model_name, dataset, input_image } = this.state;
        const methodDescriptor = MinecraftizingService[methodName];
        const request = new methodDescriptor.requestType();

        request.setNetworkName(model_name);
        request.setDataset(dataset);
        request.setInputImage(input_image);
        const props = {
            request,
            onEnd: ({ message }) => {
                this.setState({
                    ...initialUserInput,
                    response: { status: message.getStatus(), data: message.getOutput(), source: input_image},
                });
            },
        };

        this.props.serviceClient.unary(methodDescriptor, props);
    }

    getImageData(data)
    {
        this.setState({input_image: data})
    }

    renderForm() {
        const { classes } = this.props;
        const serviceNameOptions = ["Select a value", ...this.props.serviceClient.getMethodNames(MinecraftizingService)];
        const modelNames = {
            UGATIT: "UGATIT",
            cycle_gan: "cycle_gan"
        };
        const datasetNames = {
            minecraft_landscapes: "minecraft_landscapes",
        };

        const modelNamesList = Object.entries(modelNames).map(([key, value]) => ({ value, label: key }));
        const datasetNamesList = Object.entries(datasetNames).map(([key, value]) => ({ value, label: key }));

        return (
            <React.Fragment>
                <div className={classes.container}>
                    <div className="row" align="left">
                        <div style={htstyle}>
                            Method Name:{" "}
                        </div>
                        <MethodNamesDropDown
                            list={serviceNameOptions}
                            value={this.state.methodName}
                            onChange={this.handleFormUpdate}
                        />
                    </div>
                    {styledDropdownWrap("Model name:", modelNamesList, this.state.model_name, this.handleModelChange, classes.dropDown)}
                    {styledDropdownWrap("Dataset Name:", datasetNamesList, this.state.dataset, this.handleDatasetChange, classes.dropDown)}
                </div>
                <div className={classes.uploader} align="center">
                    <SNETImageUpload imageName={""} imageDataFunc={this.getImageData} instantUrlFetch={true} allowURL={true} />
                </div>
                <div className="row">
                    <div style={htstyle}>
                        About:{" "}
                    </div>
                    {repeatedButton(this.state.users_guide, "Guide")}
                    {repeatedButton(this.state.code_repo, "Code")}
                </div>
                <div className="row">
                    <div className={classes.invoke}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.submitAction}
                            disabled={!this.canBeInvoked()}
                        >
                            Invoke
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    renderComplete() {
        const { response } = this.state;
        let img_base64 = "data:image/jpeg;base64," + response.data;
        let source_image = "data:image/jpeg;base64," + response.source;
        return (
            <div style={{padding: "10px 0"}} align="center">:
                <img style={ imgstyle } src={source_image} alt={"Original image"} />
                <img style={ imgstyle } src={img_base64} alt={"Minecraftizied image"} />
            </div>
        )
    }

    render() {
        if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
        else {
            return <div>{this.renderForm()}</div>;
        }
    }
}

export default withStyles(useStyles)(MinecraftService);