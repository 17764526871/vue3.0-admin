import request from '@/utils/request'
import { LoginFormData, LoginResponseData, userInfoResponseData } from './type'
enum API {
  LOGIN_URL = '/user/login',
  USER_INFO_URL = '/user/info',
  LOGOUT_URL = '/user/logout',
}
//login 接口
export const reqLogin = (data: LoginFormData) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data)

//获取用户信息接口
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USER_INFO_URL)

//登出接口
export const reqLogOut = () => request.post<any, any>(API.LOGOUT_URL)
