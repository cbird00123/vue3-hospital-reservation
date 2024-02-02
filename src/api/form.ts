export type inputType = 'phone' | 'bizno'

const formInput = (type: inputType, param?: any) => {
  const input = {
    phone: (v: string) => {
      console.log(v)
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
    }
  }
  return input[type](param)
}

export { formInput }
