import { find, map } from 'lodash';
import url from 'url';
import RegistryNetworks from 'singularitynet-platform-contracts/networks/Registry.json';
import RegistryAbi from 'singularitynet-platform-contracts/abi/Registry.json';
import { get } from 'axios';

import logger from './utils/logger';

export default class IPFSMetadataProvider {
  constructor(web3, networkId, ipfsEndpoint) {
    this._web3 = web3;
    this._networkId = networkId;
    this._ipfsEndpoint = ipfsEndpoint;
    const registryAddress = RegistryNetworks[this._networkId].address;
    this._registryContract = new this._web3.eth.Contract(RegistryAbi, registryAddress);
  }

  /**
   * @param {string} orgId
   * @param {string} serviceId
   * @returns {Promise.<ServiceMetadata>}
   */
  async metadata(orgId, serviceId) {
    logger.debug(`Fetching service metadata [org: ${orgId} | service: ${serviceId}]`);
    let orgIdBytes = this._web3.utils.fromAscii(orgId);
    orgIdBytes = orgIdBytes.padEnd(66, '0'); // 66 = '0x' + 64 hex characters

    let serviceIdBytes = this._web3.utils.fromAscii(serviceId);
    serviceIdBytes = serviceIdBytes.padEnd(66, '0'); // 66 = '0x' + 64 hex characters

    const orgMetadata = await this._fetchOrgMetadata(orgIdBytes);
    const serviceMetadata = await this._fetchServiceMetadata(orgIdBytes, serviceIdBytes);
    return Promise.resolve(this._enhanceServiceGroupDetails(serviceMetadata, orgMetadata));
  }

  async _fetchOrgMetadata(orgIdBytes) {
    logger.debug('Fetching org metadata URI from registry contract');
    const { orgMetadataURI } = await this._registryContract.methods.getOrganizationById(orgIdBytes).call();

    return this._fetchMetadataFromIpfs(orgMetadataURI);
  }

  async _fetchServiceMetadata(orgIdBytes, serviceIdBytes) {
    logger.debug('Fetching service metadata URI from registry contract');
    const { metadataURI: serviceMetadataURI } = await this._registryContract.methods
      .getServiceRegistrationById(orgIdBytes, serviceIdBytes)
      .call();
    return this._fetchMetadataFromIpfs(serviceMetadataURI);
  }

  async _fetchMetadataFromIpfs(metadataURI) {
    let ipfsCID = `${this._web3.utils.hexToUtf8(metadataURI).substring(7)}`;
    ipfsCID = ipfsCID.replace(/\0/g, '');
    logger.debug(`Fetching metadata from IPFS[CID: ${ipfsCID}]`);
    try {
      const fetchUrl = `${this._ipfsEndpoint}/api/v0/cat?arg=${ipfsCID}`;
      const response = await get(fetchUrl);
      return response.data;
    } catch (error) {
      logger.debug(`Error fetching metadata from IPFS[CID: ${ipfsCID}]`);
      throw error;
    }
  }

  _enhanceServiceGroupDetails(serviceMetadata, orgMetadata) {
    const { groups: orgGroups } = orgMetadata;
    const { groups: serviceGroups } = serviceMetadata;

    const groups = map(serviceGroups, (group) => {
      const { group_name: serviceGroupName } = group;
      const orgGroup = find(orgGroups, ({ group_name: orgGroupName }) => orgGroupName === serviceGroupName);
      return {
        ...group,
        payment: orgGroup.payment,
      };
    });

    return { ...serviceMetadata, groups };
  }

  _constructIpfsClient() {
    const { protocol = 'http', hostname: host, port = 5001 } = url.parse(this._ipfsEndpoint);
    const ipfsHostOrMultiaddr = { protocol: protocol.replace(':', ''), host, port };
    return IPFSClient(ipfsHostOrMultiaddr);
  }
}
