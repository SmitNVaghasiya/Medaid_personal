import axios from ".";

class AuthApi {
  static Login = (data) => {
    return axios.post(`${base}/login`, data);
  };

  static signup = async (data) => {
    console.log(data);
    return await axios.post(`${base}/registration`, data);
  };

  static getServicesList = async (servicetype) => {
    console.log("servicetype", servicetype);
    return axios.post(`${base}/servicelist?type=${servicetype}`);
  };

  static getWorkplace = async (workplacetype) => {
    return axios.get(`${base}/workplace/${workplacetype}`);
  };

  static requestAppointment = async (data) => {
    return axios.post(`${base}/requestAppointment`, { data });
  };

  static appointmentStatusUpdate = (data) => {
    return axios.post(`${base}/appointmentStatusUpdate`, data);
  };

  static deleteUser = (data) => {
    return axios.post(`${base}/deleteUser`, data);
  };

  static upload = (data) => {
    console.log(data);
    return axios.post(`${base}/uploadDoc`, data);
  };

  static getUser = () => {
    return axios.get(`${base}/user/getMyDetails`);
  };

  static allUsers = () => {
    return axios.get(`${base}/allUsers`);
  };

  static getSymptoms = (data) => {
    return axios.post(`${base}/getSymptoms`, data);
  };

  static isUserAvailable = (mobileNo) => {
    return axios.get(`${base}/isUserAvailable/${mobileNo}`);
  };

  static updateUser = (type, data) => {
    console.log(data);
    return axios.post(`${base}/updateUser?type=${type}`, data);
  };
  static getWorkplaceSloats = (data) => {
    console.log(data);
    return axios.post(`${base}/getWorkplaceSloats`, data);
  };

  static Logout = (data) => {
    return true;
  };
}

let base = "/api";

export default AuthApi;
