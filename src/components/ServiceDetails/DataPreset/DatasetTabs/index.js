import { useState } from "react";
import StyledTabs from "../../StyledTabs";
import DatasetsList from "../DatasetsList";
import { useSelector } from "react-redux";

const DatasetTabs = ({ setDatasetInfo }) => {
  const exampleDatasets = useSelector((state) => state.datasetReducer.exampleDatasets);
  const recentDatasets = useSelector((state) => state.datasetReducer.recentDatasets);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (activeTab) => {
    setActiveTab(activeTab);
  };

  const tabs = [
    {
      name: "Recent",
      activeIndex: 0,
      component: <DatasetsList setDatasetInfo={setDatasetInfo} datasets={recentDatasets} />,
    },
    {
      name: "Examples",
      activeIndex: 1,
      component: <DatasetsList setDatasetInfo={setDatasetInfo} datasets={exampleDatasets} />,
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
