interface loginParams {
  patientNm: string
  telNum: string
  birth: string
}

const apis = {
  login: async (params: loginParams, siteCode) => {
    let value = {}
    await fetch(
      `/api/auth/join/ssl/${siteCode}?patientNm=${params.patientNm}&telNum=${params.telNum}&birth=${params.birth}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
        // body: JSON.stringify(params)
      }
    ).then((response) => {
      if (response.status === 200) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        const decodeResponse = (ch) => {
          const chunk = decoder.decode(ch.value || new Uint8Array(), {
            stream: !ch.done
          })
          value = JSON.parse(chunk)
        }
        reader.read().then(decodeResponse)
      }
    })
  }
}

export { apis }
