import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

const examplesDatasets = [
  { id: 1, tag: "Text", name: "Dataset 1", link: "link/to/s3/1" },
  { id: 2, tag: "Text", name: "Dataset 2", link: "link/to/s3/2" },
  { id: 3, tag: "Text", name: "Dataset 3", link: "link/to/s3/3" },
  { id: 4, tag: "Text", name: "Dataset 4", link: "link/to/s3/4" },
];

const ExampleDatasets = ({ classes, setDatasetInfo }) => {
  const ExampleDataset = ({ name, link, tag }) => {
    return (
      <div onClick={() => setDatasetInfo({ link, name })} className={classes.exampleDataset}>
        <div>{name}</div>
        <div>{tag}</div>
      </div>
    );
  };

  return (
    <div className={classes.examplesContainer}>
      <span>Select exemple dataset</span>
      <div className={classes.examplesContainer}>
        {examplesDatasets.map((exampleDataset) => (
          <ExampleDataset
            key={exampleDataset.id}
            name={exampleDataset.name}
            link={exampleDataset.link}
            tag={exampleDataset.tag}
          />
        ))}
      </div>
    </div>
  );
};

export default withStyles(useStyles)(ExampleDatasets);
