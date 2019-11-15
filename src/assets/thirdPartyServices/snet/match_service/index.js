import React from "react";
import Button from "@material-ui/core/Button";

import { MatchApi } from "./MatchingAPI_pb_service";
import MethodNamesDropDown from "../../common/MethodNamesDropDown";
import SNETImageUpload from "../../standardComponents/SNETImageUpload";
import StyledDropdown from "../../../../components/common/StyledDropdown/index";

import { useStyles } from "./styles";
import { withStyles } from "@material-ui/styles";

const initialUserInput = {
    methodName: "Select a method",
    image: "",
    second_image: "",
    detector_name: "Select a value",
    descriptor_name: "Select a value",
    transform_name: "Select a value",
    selectedFile: [],
};

const descriptorMethods = {ORB: "ORB", AKAZE: "AKAZE", KAZE: "KAZE", BRISK: "BRISK", BRIEF: "BRIEF", FREAK: "FREAK", LUCID: "LUCID",
    LATCH: "LATCH", DAISY: "DAISY", VGG: "VGG", BOOST: "BOOST", PCT: "PCT", Superpoint: "Superpoint"};

const keypointMethods = {ORB: "ORB", KAZE: "KAZE", AKAZE: "AKAZE",
    AGAST: "AGAST", GFT: "GFT", MSER: "MSER", BRISK: "BRISK", FAST: "FAST", BLOB: "BLOB", STAR: "STAR", MSDS: "MSDS",
    HLFD: "HLFD", Superpoint: "Superpoint", Magicpoint:"Magicpoint" };

const transforms = {Affine: "Affine", Perspective: "Perspective", Homography: "Homography", Shift: "Shift", ShiftRot: "ShiftRot",
    ShiftScale: "ShiftScale", Similarity: "Similarity"};

const descriptorMethodsList = Object.entries(descriptorMethods).map(([key, value]) => ({ value, label: key }));
const keypointMethodsList = Object.entries(keypointMethods).map(([key, value]) => ({ value, label: key }));
const transformsList = Object.entries(transforms).map(([key, value]) => ({ value, label: key }));

const htstyle = {
    padding: "10px",
    fontSize: "13px"
};

const buttonStyle = {
    fontSize: "13px",
    marginLeft: "10px"
};

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

function repeatedButton (hrf, data)
{
    return (
        <Button target="_blank" href={hrf} style={buttonStyle}>
            <ul>{data}</ul>
        </Button>
    );
}

class MatchingService extends React.Component {
    constructor(props) {
        super(props);
        this.submitAction = this.submitAction.bind(this);
        this.submitAction_getkp = this.submitAction_getkp.bind(this);
        this.submitAction_getmatch = this.submitAction_getmatch.bind(this);
        this.submitAction_gettransform = this.submitAction_gettransform.bind(this);
        this.submitAction_getclosest = this.submitAction_getclosest.bind(this);
        this.handleFormUpdate = this.handleFormUpdate.bind(this);
        this.getImageData = this.getImageData.bind(this);
        this.chooseRender = this.chooseRender.bind(this);
        this.getSecondImageData = this.getSecondImageData.bind(this);
        this.renderForm_getmatch = this.renderForm_getmatch.bind(this);
        this.renderForm_gettransform = this.renderForm_gettransform.bind(this);
        this.renderForm_getclosest = this.renderForm_getclosest.bind(this);
        this.getFolderData = this.getFolderData.bind(this);
        this.handleDetectorChange = this.handleDetectorChange.bind(this);
        this.handleDescriptorChange = this.handleDescriptorChange.bind(this);
        this.handleTransformChange = this.handleTransformChange.bind(this);


        this.state = {
            ...initialUserInput,
            users_guide: "https://github.com/singnet/semantic-vision/blob/master/services/MatchingAPI/Readme_service.md",
            code_repo: "https://github.com/singnet/semantic-vision/tree/master/services/MatchingAPI",
            response: undefined,
        };
    }

    canBeInvoked() {
        if (this.state.methodName !== "Select a method")
        {
            if (this.state.methodName === "getKP")
            {
                return this.state.image && this.state.detector_name !== "Select a value"
            }
            else if (this.state.methodName === "getMatchByImage")
            {
                return this.state.image && this.state.second_image && this.state.detector_name !== "Select a value" &&
                    this.state.descriptor_name !== "Select a value";
            }
            else if (this.state.methodName === "getTransformParametersByImage")
            {
                return this.state.image && this.state.second_image && this.state.detector_name !== "Select a value" &&
                    this.state.descriptor_name !== "Select a value" && this.state.transform_name !== "Select a value";
            }
            else if (this.state.methodName === "getClosestImages")
            {
                return this.state.image && this.state.selectedFile.length > 0 && this.state.detector_name !== "Select a value" &&
                    this.state.descriptor_name !== "Select a value";
            }
        }
        else
            return false;
    }

    handleFormUpdate(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleDetectorChange (event) {
        const { value } = event.target;
        this.setState({detector_name: value})
    }

    handleDescriptorChange (event) {
        const { value } = event.target;
        this.setState({descriptor_name: value})
    }

    handleTransformChange (event) {
        const { value } = event.target;
        this.setState({transform_name: value})
    }

    submitAction_getkp() {
        const methodDescriptor = MatchApi[this.state.methodName];
        const request = new methodDescriptor.requestType();
        request.setImage(this.state.image);
        request.setDetectorName(this.state.detector_name);

        return { request, methodDescriptor };
    }

    submitAction_getmatch()
    {
        const methodDescriptor = MatchApi[this.state.methodName];
        const request = new methodDescriptor.requestType();
        request.setImageFirst(this.state.image);
        request.setImageSecond(this.state.second_image);
        request.setDetectorName(this.state.detector_name);
        request.setDescriptorName(this.state.descriptor_name);

        return { request, methodDescriptor };
    }

    submitAction_gettransform()
    {
        const methodDescriptor = MatchApi[this.state.methodName];
        const request = new methodDescriptor.requestType();
        request.setImageFirst(this.state.image);
        request.setImageSecond(this.state.second_image);
        request.setDetectorName(this.state.detector_name);
        request.setDescriptorName(this.state.descriptor_name);
        request.setTransformType(this.state.transform_name);

        return { request, methodDescriptor };
    }

    submitAction_getclosest()
    {
        const methodDescriptor = MatchApi[this.state.methodName];
        const request = new methodDescriptor.requestType();
        request.setInputImage(this.state.image);
        request.setDetectorName(this.state.detector_name);
        request.setDescriptorName(this.state.descriptor_name);
        for (var i = 0; i < this.state.selectedFile.length; i++)
        {
            request.addImageBase(this.state.selectedFile[i])
        }
        request.setNumofimagestoretrieve(5);
        request.setNumofclusters(1000);

        return { request, methodDescriptor };
    }

    submitAction()
    {
        var request, methodDescriptor, rm_couple;
        if (this.state.methodName === "getKP")
        {
            rm_couple = this.submitAction_getkp();
        }
        else if (this.state.methodName === "getMatchByImage")
        {
            rm_couple = this.submitAction_getmatch();
        }
        else if (this.state.methodName === "getTransformParametersByImage")
        {
            rm_couple = this.submitAction_gettransform();
        }
        else if (this.state.methodName === "getClosestImages")
        {
            rm_couple = this.submitAction_getclosest();
        }

        request = rm_couple['request'];
        methodDescriptor = rm_couple['methodDescriptor'];
        const props = {
            request,
            onEnd: ({ message }) => {
                this.setState({
                    ...initialUserInput,
                    response: { resultImage: message.getUiimage(), status: message.getStatus()},
                });
            },
        };

        this.props.serviceClient.unary(methodDescriptor, props);
    }


    getImageData(data)
    {
        this.setState({image: data})
    }

    getSecondImageData(data)
    {
        this.setState({second_image: data})
    }

    getFolderData(event)
    {
        var files = event.target.files;
        var images = [];
        for (var i = 0; i < files.length; i++)
        {
            var reader  = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = function(event) {
                if (event.target.result.slice(0,10) === "data:image")
                    var idxstart = event.target.result.indexOf("base64,")+7;
                    var idxend = event.target.result.length;
                    images.push(event.target.result.slice(idxstart, idxend));
            }
        }
        this.state.selectedFile = images;
    }

    chooseRender(classes)
    {
        if(this.state.methodName === "getMatchByImage")
        {
            return (
                this.renderForm_getmatch()
            )
        }
        else if(this.state.methodName === "getTransformParametersByImage" )
        {
            return (
                this.renderForm_gettransform(classes)
            )
        }
        else if (this.state.methodName === "getClosestImages")
        {
            return (
                this.renderForm_getclosest(classes)
            )
        }
    }

    renderForm_getmatch(){
        const { classes } = this.props;
        return (
            <React.Fragment>
                {styledDropdownWrap("Descriptor Name:", descriptorMethodsList, this.state.descriptor_name, this.handleDescriptorChange, classes.dropDown)}
                <div className="row" align="center">
                    <SNETImageUpload imageName={""} imageDataFunc={this.getSecondImageData} instantUrlFetch={true} allowURL={true} />
                </div>
            </React.Fragment>
        );
    }

    renderForm_gettransform(classes){
        return (
            <React.Fragment>
                {styledDropdownWrap("Descriptor Name:", descriptorMethodsList, this.state.descriptor_name, this.handleDescriptorChange, classes.dropDown)}
                {styledDropdownWrap("Transform name:", transformsList, this.state.transform_name, this.handleTransformChange, classes.dropDown)}
                <div className="row" align="center">
                    <SNETImageUpload imageName={""} imageDataFunc={this.getSecondImageData} instantUrlFetch={true} allowURL={true} />
                </div>
            </React.Fragment>
        );
    }

    renderForm_getclosest(classes) {
        return (
            <div>
                {styledDropdownWrap("Descriptor Name:", descriptorMethodsList, this.state.descriptor_name, this.handleDescriptorChange, classes.dropDown)}
                <div align="center">
                    <div style={htstyle}>
                        Choose database (upload a folder with images):
                    </div>
                    <input type="file" directory="" webkitdirectory=""  onChange={this.getFolderData}/>
                </div>
                <div style={htstyle} align="center">
                    Upload one image to retrieve Top-5 closest images from uploaded database:
                </div>
            </div>
        )
    }

    renderForm() {
        const serviceNameOptions = ["Select a method", "getKP", "getMatchByImage", "getTransformParametersByImage", "getClosestImages"];
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className="row">
                    <div style={htstyle}>
                        Method Name:{" "}
                    </div>
                    <div>
                        <MethodNamesDropDown
                            list={serviceNameOptions}
                            value={this.state.methodName}
                            onChange={this.handleFormUpdate}
                        />
                    </div>
                </div>
                {styledDropdownWrap("Detector Name:", keypointMethodsList, this.state.detector_name, this.handleDetectorChange, classes.dropDown)}
                {this.chooseRender(classes)}
                <div className="row" align="center">
                    <SNETImageUpload imageName={""} imageDataFunc={this.getImageData} instantUrlFetch={true} allowURL={true} />
                </div>
                <div className="row">
                    <div style={{ textAlign: "right" }}>
                        <Button
                            style={buttonStyle}
                            type="button"
                            className="btn btn-primary"
                            onClick={this.submitAction}
                            disabled={!this.canBeInvoked()}
                        >
                            Invoke
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div style={htstyle}>
                        About:{" "}
                    </div>
                    {repeatedButton(this.state.users_guide, "Guide")}
                    {repeatedButton(this.state.code_repo, "Code")}
                </div>
            </React.Fragment>
        )
    }

    renderComplete() {
        const { response } = this.state;
        let img_base64 = "data:image/jpeg;base64," + response.resultImage;
        return (
            <div style={{ padding: "10px 0"}} align="center">:
                <img style={{ maxWidth: "100%" }} src={img_base64} alt={"Result image"} />
            </div>
        );
    }

    render() {
        if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
        else {
            return <div>{this.renderForm()}</div>;
        }
    }
}

export default withStyles(useStyles)(MatchingService);