import axiosClient from "./axiosClient";

const violationApi = {
  getViolation: (params) => {
    const url = `/violation/${params.startDate}/${params.endDate}/${params.serialStation}/${params.page}/${params.size}`;
    return axiosClient.get(url);
  }
};

export default violationApi;
