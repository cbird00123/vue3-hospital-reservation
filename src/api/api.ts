interface ILoginParams {
  patientNm: string
  telNum: string
  birth: string
}

interface IResponse {
  resultCd: string
  resultMsg: string
  contents: any
}

let response: IResponse
let rpaResponse: any

const apiBasePath: string = 'http://3.36.169.28:8100'
const rpaBasePath: string = 'http://3.36.169.28:8500'

const convertingParamsToQuerystring = (params: any) => {
  let tempString = '?'
  for (const [key, item] of Object.entries(params)) {
    tempString += `${key}=${item}&`
  }
  return tempString.slice(0, -1)
}

const decodeResponse = async (resBody: any, callType?: string) => {
  const reader = resBody.getReader()
  const decoder = new TextDecoder()

  const decodeReadVal = (ch: any) => {
    const chunk = decoder.decode(ch.value || new Uint8Array(), {
      stream: !ch.done
    })

    if (callType !== 'normal') {
      rpaResponse = JSON.parse(chunk)
    } else {
      response = JSON.parse(chunk)
    }
  }
  await reader.read().then((res: any) => {
    decodeReadVal(res)
  })
}

const callFetch = async (
  path: string,
  options: any,
  body = {},
  callType = 'normal'
) => {
  if (body) {
    Object.assign(options, body)
  }

  const originPath = (callType !== 'normal' ? rpaBasePath : apiBasePath) + path

  await fetch(originPath, options).then(async (res) => {
    if (res.status === 200) {
      await decodeResponse(res.body, callType)
    }
  })
}

const displayLoading = (val: string) => {
  // @ts-ignore
  document.querySelector('.loading').style.display = val
}

const setRpaLoading = (state: boolean) => {
  const rpaLoadingElement = document.getElementById('rpa-loading')
  if (rpaLoadingElement) {
    if (state) {
      if (!rpaLoadingElement.className) {
        rpaLoadingElement.className = 'rpa-loading-transition'
      }
    } else if (rpaLoadingElement.className.includes('rpa-loading-transition')) {
      rpaLoadingElement.className = ''
    }
  }
}
const apis = {
  aiHome: async (homeName: string, siteCode: string) => {
    displayLoading('block')
    await callFetch(`/api/home/${homeName}/sites/${siteCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    displayLoading('none')
    return response
  },
  login: async (params: ILoginParams, siteCode: string) => {
    displayLoading('block')
    await callFetch(
      `/api/auth/join/ssl/${siteCode}?patientNm=${params.patientNm}&telNum=${params.telNum}&birth=${params.birth}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response && response.resultCd === '200') {
      Object.assign(response?.contents, params)
      sessionStorage.setItem('userInfo', JSON.stringify(response?.contents))
    }
    displayLoading('none')
  },
  interview: async (siteCode: string) => {
    displayLoading('block')
    await callFetch(`/api/rpa/sites/${siteCode}/interviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    displayLoading('none')
    return response
  },
  date: async (params: any, siteCode: string) => {
    displayLoading('block')
    const querystring = convertingParamsToQuerystring(params)
    await callFetch(
      `/api/rpa/sites/${siteCode}/departments/doctors/possible/schedule${querystring}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    displayLoading('none')
    return response
  },
  time: async (date: string, params: any, siteCode: string) => {
    displayLoading('block')
    const querystring = convertingParamsToQuerystring(params)
    await callFetch(
      `/api/rpa/sites/${siteCode}/departments/{deptNo}/schedule/${date}${querystring}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    displayLoading('none')
    return response
  },
  reservation: async (params: any, siteCode: string) => {
    setRpaLoading(true)
    await callFetch(`/api/rpa/sites/${siteCode}/medical/appointment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    setRpaLoading(false)
    return response
  },
  changeReservation: async (params: any, siteCode: string) => {
    setRpaLoading(true)
    await callFetch(`/api/rpa/sites/${siteCode}/medical/appointment`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    setRpaLoading(false)
    return response
  },
  cancelReservation: async (params: any, siteCode: string) => {
    const querystring = convertingParamsToQuerystring(params)
    setRpaLoading(true)
    await callFetch(
      `/api/rpa/sites/${siteCode}/medical/appointment${querystring}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    setRpaLoading(false)
    return response
  },
  history: async (patientType: string, params: any, siteCode: string) => {
    displayLoading('block')
    const querystring = convertingParamsToQuerystring(params)
    await callFetch(
      `/api/rpa/sites/${siteCode}/patients/appointment/schedule${patientType}${querystring}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    displayLoading('none')
    return response
  },
  rpaLoading: async (siteCode: string, callType: string) => {
    await callFetch(
      `/rpa-server/sites/${siteCode}/message/count`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      {},
      callType
    )

    return rpaResponse
  }
}

export { apis }
