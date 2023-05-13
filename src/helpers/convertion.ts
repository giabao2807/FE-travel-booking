export const convertionType = () => {
  const formatCurrency = (item: number) => {
    return item.toLocaleString('vi', { style : 'currency', currency : 'VND' })
  }
  const deCodeHtml = (tagCut: string, html?: string) => {
    const container = document.createElement('div')
    const arrHtml = []
    container.innerHTML = html ? html : ''
    const decodedHTML = container.querySelector(tagCut)
    const sectionHeader = decodedHTML?.outerHTML
    decodedHTML ? container.removeChild(decodedHTML) : ''
    arrHtml.push(sectionHeader, container.outerHTML)
    return arrHtml
  }

  return {
    formatCurrency,
    deCodeHtml
  }
}