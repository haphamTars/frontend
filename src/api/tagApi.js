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
  }
};

export default tagApi;
