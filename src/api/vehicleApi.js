import axiosClient from "./axiosClient";


const vehicleApi = {
  createVehicle: (params) => {
    const url = `/vehicle`;
    return axiosClient.post(url, params);
  },
  getVehicles: () => {
    const url = `/vehicle`;
    return axiosClient.get(url);
  },
  deleteVehicle: (vehicleId) => {
    const url = `vehicle/${vehicleId}`
    return axiosClient.delete(url)
  },
  import: (formData) => {
    const url = `/vehicle/import`
    return axiosClient.post(url, formData)
  },
  updateVehicle: (params, vehicleId) => {
    const url = `/vehicle/${vehicleId}`;
    return axiosClient.put(url, params)
  }
};

export default vehicleApi;
