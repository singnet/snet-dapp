import { isUndefined } from "lodash";

const DownloadMedia = (media, asset_type, filename) => {
  const mediaDetails = media.find((mediaItem) => mediaItem.asset_type === asset_type);

  if (typeof mediaDetails !== "undefined") {
    const url = mediaDetails["url"];
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  } else {
    console.log("Files are not found");
  }
};

export const isMediaAvailableForDownloading = (media, assetType) => {
  if (!media) {
    return;
  }

  const mediaDetails = media.find((mediaItem) => mediaItem?.asset_type === assetType);
  return !isUndefined(mediaDetails);
};

export default DownloadMedia;
