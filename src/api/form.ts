export type ruleType =
  | 'require'
  | 'notSpecialCharacter'
  | 'onlyNumber'
  | 'phone'
  | 'birth'
  | 'min'
  | 'max'

export type inputType = 'phone' | 'birth'

const formInput = (type: inputType, param?: any) => {
  const input = {
    phone: (v: string) => {
      if (!v) {
        return ''
      }

      v = v.replace(/[^0-9]/g, '')

      const result = []
      let restNumber = ''

      // 지역번호와 나머지 번호로 나누기
      if (v.startsWith('02')) {
        // 서울 02 지역번호
        result.push(v.substr(0, 2))
        restNumber = v.substring(2)
      } else if (v.startsWith('1')) {
        // 지역 번호가 없는 경우
        // 1xxx-yyyy
        restNumber = v
      } else {
        // 나머지 3자리 지역번호
        // 0xx-yyyy-zzzz
        result.push(v.substr(0, 3))
        restNumber = v.substring(3)
      }

      if (restNumber.length === 7) {
        // 7자리만 남았을 때는 xxx-yyyy
        result.push(restNumber.substring(0, 3))
        result.push(restNumber.substring(3))
      } else {
        result.push(restNumber.substring(0, 4))
        result.push(restNumber.substring(4))
      }

      return result.filter((val) => val).join('-')
    },
    birth: (v: string) => {
      if (!v) {
        return ''
      }

      v = v.replace(/[^0-9]/g, '')

      const result = v.match(/(\d{0,4})(\d{0,2})(\d{0,2})/)
      // @ts-ignore
      const [, year, month, date]: RegExpMatchArray = result
      return !month ? year : `${year}-${month}${date ? `-${date}` : ''}`
    }
  }
  return input[type](param)
}

const formRule = (rule: ruleType, param?: any) => {
  const rules = {
    require: () => (v: string) => {
      return !!v || '필수 항목입니다.'
    },
    onlyNumber: () => (v: string) => {
      if (v) {
        return /^[0-9/\-/,/.]+$/.test(v) || '숫자만 입력이 가능합니다.'
      }
      return true
    },
    notSpecialCharacter: () => (v: string) => {
      if (v) {
        return (
          /^[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]*$/gi.test(v) ||
          '특수문자나 공백은 입력할 수 없습니다.'
        )
      }
      return true
    },
    birth: () => (v: string) => {
      if (v) {
        return v.length >= 10 || '생년월일은 8자여야 합니다.'
      }
      return true
    },
    phone: () => (v: string) => {
      return (
        /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/.test(v) ||
        '전화번호만 입력이 가능합니다.'
      )
    },
    min: (leng: number) => (v: string) => {
      if (!leng) {
        return '최소길이 정보를 선언해주세요.'
      }
      return v?.length >= leng || `최소 ${leng}자를 넘어야 합니다.`
    },
    max: (leng: number) => (v: string) => {
      if (!leng) {
        return '최대길이 정보를 선언해주세요.'
      }
      return v?.length <= leng || `최대 ${leng}자 이내 입력이 가능합니다.`
    }
  }

  if (typeof rules[rule] === 'function') {
    return rules[rule](param)
  }

  console.error(`rules에 '${rule}'는 존재하지 않습니다.`)
  return true
}

const formValidation = async (form: any) => {
  const { valid } = await form.value.validate()

  if (!valid) {
    const errObj: any = document.querySelector('.v-input--error')
    const scrollOpt = {
      behavior: 'smooth',
      block: 'center'
    }
    errObj.scrollIntoView(scrollOpt)
  }

  return valid
}

export { formInput, formRule, formValidation }
