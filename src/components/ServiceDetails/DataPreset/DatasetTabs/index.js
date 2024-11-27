import { useState } from "react";
import StyledTabs from "../../StyledTabs";
import DatasetsList from "../DatasetsList";

const datasetsExamples = [
  { id: 1, tag: "Text", name: "DataSet 1: Training data for text translation", link: "link/to/s3/1" },
  { id: 2, tag: "Text", name: "DataSet 2: Training data for text translation", link: "link/to/s3/2" },
  { id: 3, tag: "Text", name: "DataSet 3: Training data for text translation", link: "link/to/s3/3" },
  { id: 4, tag: "Text", name: "DataSet 4: Training data for text translation", link: "link/to/s3/4" },
];

const datasetsRecent = [
  { id: 1, tag: "Text", name: "DataSet Recent 1: Training data for text translation", link: "link/to/s3/1" },
  { id: 2, tag: "Text", name: "DataSet Recent 2: Training data for text translation", link: "link/to/s3/2" },
  { id: 3, tag: "Text", name: "DataSet Recent 3: Training data for text translation", link: "link/to/s3/3" },
  { id: 4, tag: "Text", name: "DataSet Recent 4: Training data for text translation", link: "link/to/s3/4" },
];

const DatasetTabs = ({ setDatasetInfo }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (activeTab) => {
    setActiveTab(activeTab);
  };

  const tabs = [
    {
      name: "Recent",
      activeIndex: 0,
      component: <DatasetsList setDatasetInfo={setDatasetInfo} datasets={datasetsRecent} />,
    },
    {
      name: "Examples",
      activeIndex: 1,
      component: <DatasetsList setDatasetInfo={setDatasetInfo} datasets={datasetsExamples} />,
    },
  ];

  return (
    <div>
      <h3>Select example or recent dataset</h3>
      <StyledTabs tabs={tabs} activeTab={Number(activeTab)} onTabChange={handleTabChange} />
    </div>
  );
};

export default DatasetTabs;
