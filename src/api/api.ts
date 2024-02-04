interface loginParams {
  patientNm: string
  telNum: string
  birth: string
}

let response: any = {}

const decodeResponse = async (resBody) => {
  const reader = resBody.getReader()
  const decoder = new TextDecoder()

  const decodeReadVal = (ch) => {
    const chunk = decoder.decode(ch.value || new Uint8Array(), {
      stream: !ch.done
    })
    response = JSON.parse(chunk)
  }
  await reader.read().then((res) => {
    decodeReadVal(res)
  })
}

const apis = {
  login: async (params: loginParams, siteCode) => {
    await fetch(
      `/api/auth/join/ssl/${siteCode}?patientNm=${params.patientNm}&telNum=${params.telNum}&birth=${params.birth}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
        // body: JSON.stringify(params)
      }
    ).then((res) => {
      if (res.status === 200) {
        decodeResponse(res.body)
      }
    })
  }
}

export { apis }
