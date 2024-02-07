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

const convertingParamsToQuerystring = (params: any) => {
  let tempString = '?'
  for (const [key, item] of Object.entries(params)) {
    tempString += `${key}=${item}&`
  }
  return tempString.slice(0, -1)
}

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

const displayLoading = (val: string) => {
  // @ts-ignore
  document.querySelector('.loading').style.display = val
}

const apis = {
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
    displayLoading('block')
    await callFetch(`/api/rpa/sites/${siteCode}/medical/appointment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    displayLoading('none')
    return response
  },
  changeReservation: async (params: any, siteCode: string) => {
    displayLoading('block')
    // await callFetch(`/api/rpa/sites/${siteCode}/medical/appointment`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(params)
    // })
    displayLoading('none')
    return response
  },
  cancelReservation: async (params: any, siteCode: string) => {
    displayLoading('block')
    // const cancelData = {
    //   siteId: this.$store.getters.getSiteCode,
    //   appointmentDate: this.reservationData.staff.appointmentDate,
    //   reservationKey: this.reservationData.staff.reservationKey,
    //   deptNm: this.reservationData.staff.deptNm,
    //   deptNo: this.reservationData.staff.deptNo,
    //   doctorNm: this.reservationData.staff.doctorNm,
    //   patientNo:
    //     this.reservationData.patientNoString === '0'
    //       ? null
    //       : this.reservationData.patientNoString,
    //   patientType: this.getPatientType(),
    //   cancelComment: this.cancelReasonTypeCode,
    //   patientNm: this.userInfo?.userNm || this.ssnInfo?.name,
    //   birth:
    //     this.userInfo?.birth?.replaceAll('-', '') ||
    //     this.ssnInfo?.birth?.replaceAll('-', ''),
    //   telNum: this.userInfo?.cellphoneNum || this.ssnInfo?.telNum,
    //   ssn: this.ssnInfo?.ssn,
    //   hospitalBranch: this.branchData.name,
    // }
    // await callFetch(`/api/rpa/sites/${siteCode}/medical/appointment`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(params)
    // })
    displayLoading('none')
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
  }
}

export { apis }
