import axiosClient from "./axiosClient";


const tagApi = {
  createTag: (params) => {
    const url = `/tag`;
    return axiosClient.post(url, params);
  },
  getTags: () => {
    const url = `/tag`;
    return axiosClient.get(url);
  },
  deleteTag: (tagId) => {
    const url = `tag/${tagId}`
    return axiosClient.delete(url)
  },
  import: (formData) => {
    const url = `/tag/import`
    return axiosClient.post(url, formData)
  },
  updateTag: (params, tagId) => {
    const url = `/tag/${tagId}`;
    return axiosClient.put(url, params)
  }
};

export default tagApi;
