import axiosClient from "./axiosClient";


const personApi = {
  createPerson: (params) => {
    const url = `/person`;
    return axiosClient.post(url, params);
  },
  getPersons: () => {
    const url = `/person`;
    return axiosClient.get(url);
  },
  deletePerson: (tagId) => {
    const url = `person/${tagId}`
    return axiosClient.delete(url)
  },
  import: (formData) => {
    const url = `/person/import`
    return axiosClient.post(url, formData)
  },
  updatePerson: (params, personId) => {
    const url = `/person/${personId}`;
    return axiosClient.put(url, params)
  }
};

export default personApi;
