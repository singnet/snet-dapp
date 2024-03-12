import RegistryAbi from "singularitynet-platform-contracts/abi/Registry";
import RegistryNetworks from "singularitynet-platform-contracts/networks/Registry";

class RegistryContract {
  constructor(web3, networkId) {
    this._web3 = web3;
    this._contract = new this._web3.eth.Contract(RegistryAbi, RegistryNetworks[networkId].address);
  }

  /**
   * Converts a string to padded hexadecimal format.
   * @param {string} string - The string to convert.
   * @param {number} [bit=64] - The number of bits to pad to (default is 64).
   * @returns {string} The padded hexadecimal string.
   */
  _toPaddedHex(string, bit = 64) {
    const hex = this._web3.utils.fromAscii(string);
    const hexLength = hex.length;
    const additionalBit = 2; // Due 0x prepend
    if(hexLength === bit + additionalBit) return hex;
    const paddedHex = hex.padEnd(bit * (Math.floor(hexLength / bit) + 1) + additionalBit, '0');
    return paddedHex;
  }

  /**
   * Creates a new organization in the blockchain
   * @param {string} orgId - The unique organization id
   * @param {string} orgMetadataURI - The IPFS URI for the organization metadata
   * @param {Array<string>} members - List of etherum addresses of the members of the organization
   */
  createOrganization(orgId, orgMetadataURI, members) {
    const enhancedOrgId = this._toPaddedHex(orgId);
    const enhancedOrgMetadataURI = this._toPaddedHex(orgMetadataURI);
    return this._contract.methods.createOrganization(enhancedOrgId, enhancedOrgMetadataURI, [...members]);
  }

  /**
   *
   * @param {string} orgId - Id of organization to update.
   * @param {string} orgMetadataURI -- The IPFS URI for the updated organization metadata
   */
  changeOrganizationMetadataURI(orgId, orgMetadataURI) {
    const enhancedOrgId = this._toPaddedHex(orgId);
    const enhancedOrgMetadataURI = this._toPaddedHex(orgMetadataURI);
    return this._contract.methods.changeOrganizationMetadataURI(enhancedOrgId, enhancedOrgMetadataURI);
  }

  /**
   * Add new members to the organization
   * @param {string} orgId - The unique organization id
   * @param {Array<string>} newMembers - List of ethereum addresses of the new members to be added to the organization
   */
  addOrganizationMembers(orgId, newMembers) {
    const enhancedOrgId = this._toPaddedHex(orgId);
    return this._contract.methods.addOrganizationMembers(enhancedOrgId, newMembers);
  }

  /**
   * Remove the existing members from the organization
   * @param {string} orgId - The unique organization id
   * @param {Array<string>} existingMembers - List of ethereum address of the members that has to be removed from the organization
   */
  removeOrganizationMembers(orgId, existingMembers) {
    const enhancedOrgId = this._toPaddedHex(orgId);
    return this._contract.methods.removeOrganizationMembers(enhancedOrgId, existingMembers);
  }

  /**
   *
   * @param {string} orgId - The unique organization id
   * @param {string} serviceId - Id of the service to create, must be unique organization-wide.
   * @param {string} serviceMetadataURI - Service metadata. metadataURI should contain information for data consistency
   *                      validation (for example hash). We support: IPFS URI.
   */
  createServiceRegistration(orgId, serviceId, serviceMetadataURI) {
    const enhancedOrgId = this._toPaddedHex(orgId);
    const enhancedServiceId = this._toPaddedHex(serviceId);
    const enhancedServiceMetadataURI = this._toPaddedHex(serviceMetadataURI);
    return this._contract.methods.createServiceRegistration(
      enhancedOrgId,
      enhancedServiceId,
      enhancedServiceMetadataURI
    );
  }

  /**
   *
   * @param {string} orgId - The unique organization id
   * @param {string} serviceId - Id of the service to update.
   * @param {string} serviceMetadataURI - Service metadata. metadataURI should contain information for data consistency
   *                      validation (for example hash). We support: IPFS URI.
   */
  updateServiceRegistration(orgId, serviceId, serviceMetadataURI) {
    const enhancedOrgId = this._toPaddedHex(orgId);
    const enhancedServiceId = this._toPaddedHex(serviceId);
    const enhancedServiceMetadataURI = this._toPaddedHex(serviceMetadataURI);
    return this._contract.methods.updateServiceRegistration(
      enhancedOrgId,
      enhancedServiceId,
      enhancedServiceMetadataURI
    );
  }

  listOrganizations() {
    return this._contract.methods.listOrganizations();
  }

  /**
   *
   * @param {string} orgId - Id of the organization to look up.
   */
  getOrganizationById(orgId) {
    const enhancedOrgId = this._toPaddedHex(orgId);
    return this._contract.methods.getOrganizationById(enhancedOrgId);
  }

  /**
   *
   * @param {string} orgId  Id of the organization that owns the service to look up.
   * @param {string} serviceId Id of the service to look up.
   *
   * @returns {boolean} true if an organization and service with these ids exists, false otherwise. If false, all other
   *                      returned fields should be ignored.
   * @returns {string}  Id of the service, should be the same as the serviceId parameter.
   * @returns {string} metadataURI  Service metadata URI
   */
  getServiceRegistrationById(orgId, serviceId) {
    const enhancedOrgId = this._toPaddedHex(orgId);
    const enhancedServiceId = this._toPaddedHex(serviceId);
    return this._contract.methods.getServiceRegistrationById(enhancedOrgId, enhancedServiceId);
  }
}

export default RegistryContract;
