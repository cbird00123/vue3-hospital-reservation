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

const decodeResponse = async (resBody: any) => {
  const reader = resBody.getReader()
  const decoder = new TextDecoder()

  const decodeReadVal = (ch: any) => {
    const chunk = decoder.decode(ch.value || new Uint8Array(), {
      stream: !ch.done
    })
    response = JSON.parse(chunk)
  }
  await reader.read().then((res: any) => {
    decodeReadVal(res)
  })
}

const callFetch = async (path: string, options: any, body = {}) => {
  if (body) {
    Object.assign(options, body)
  }

  await fetch(path, options).then(async (res) => {
    if (res.status === 200) {
      await decodeResponse(res.body)
    }
  })

  return response
}

const apis = {
  login: async (params: ILoginParams, siteCode: string) => {
    await callFetch(
      `/api/auth/join/ssl/${siteCode}?patientNm=${params.patientNm}&telNum=${params.telNum}&birth=${params.birth}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      {
        body: ''
      }
    )

    if (response && response.resultCd === '200') {
      Object.assign(response?.contents, params)
      sessionStorage.setItem('userInfo', JSON.stringify(response?.contents))
    }
  },
  interview: async (siteCode: string) => {
    await callFetch(`/api/rpa/sites/${siteCode}/interviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }
}

export { apis }
