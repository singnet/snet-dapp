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

  const exampleTab = {
    name: "Examples",
    activeIndex: 0,
    component: <DatasetsList setDatasetInfo={setDatasetInfo} datasets={exampleDatasets} />,
  };
  const recentTab = {
    name: "Recent",
    activeIndex: 1,
    component: <DatasetsList setDatasetInfo={setDatasetInfo} datasets={recentDatasets} />,
  };

  const tabs = [];
  if (recentDatasets.length === 0) {
    tabs.push({ ...exampleTab, activeIndex: 0 });
    tabs.push({ ...recentTab, activeIndex: 1 });
  } else {
    tabs.push({ ...recentTab, activeIndex: 0 });
    tabs.push({ ...exampleTab, activeIndex: 1 });
  }

  return (
    <div>
      <h3>Select example or recent dataset</h3>
      <StyledTabs tabs={tabs} activeTab={Number(activeTab)} onTabChange={handleTabChange} />
    </div>
  );
};

export default DatasetTabs;
