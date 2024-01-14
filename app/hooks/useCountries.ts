import countries from 'world-countries'
// 所有的國家資訊

/** 所有的國家資訊(經過處理只存在需要的欄位) */
const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region
}))

/**
 * 回傳單一或全部國家資訊
 * @returns getAll (物件陣列)
 * @returns getByValue (物件)
 */
const useCountries = () => {
  /** 回傳全部國家資訊(物件陣列)*/
  const getAll = () => formattedCountries

  /** 回傳指定國家資訊(物件)*/
  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value)
  }

  return {
    getAll,
    getByValue
  }
}

export default useCountries
