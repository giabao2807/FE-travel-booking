export const convertionType = () => {
  const formatCurrency = (item: number) => {
    return item.toLocaleString('vi', { style : 'currency', currency : 'VND' })
  }
  return {
    formatCurrency
  }
}