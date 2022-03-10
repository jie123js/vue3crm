import JRequest from '../../index'

export function getPageListData(url: string, queryInfo: any) {
  return JRequest.post({
    url: url,
    data: queryInfo
  })
}
