import {environment} from 'src/environments/environment'

export const apiUrl = environment.url;

export const API_PATH = {
  AUTHEN: {
    LOGIN: `${apiUrl}/api/Authentication/Login`
  },
  DASHBOARD:{
    GET_ALL_DATA: `${apiUrl}/api/Tank/data-sets/scada`,
    SUBMIT_DATA: `${apiUrl}/Api/data-sets/nodes/`,
    FIRST_UPDATE:`${apiUrl}/api/Tank/data-sets/para`,
    SUBCRIBE_ALL:`${apiUrl}/api/Tank/subcribe/all`
  },
  DATA_VISUAL:{
    GET_DATA_IN_PERIOD:`${apiUrl}/api/Tank/data/time`,
    SUBCRIBE_CHARTS:`${apiUrl}/api/Tank/subcribe/charts`,
    UNSUBCRIBE_CHARTS:`${apiUrl}/Api/data-sets/stop-monitor`
  },
  COMMOM:{
    UNSUBCRIBE:`${apiUrl}/Api/data-sets/stop-monitor`,
    UPDATE_DATABASE:`${apiUrl}/api/Tank/database`
  }
}
