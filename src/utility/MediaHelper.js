const DownloadMedia = (media, asset_type, filename) => {
    const stubDetails = media.filter(media_item => media_item.asset_type == asset_type)[0]
    if (typeof (stubDetails) !== "undefined") {
        const url = stubDetails['url']
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
    }
    else {
        console.log('Files are not found')
    }
}

export default DownloadMedia;