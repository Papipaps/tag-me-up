// Méthode utilitaire pour enregistrer des données JSON dans le localStorage
export function saveDataToLocalStorage(key: string, data: any): void {
  localStorage.setItem(key, JSON.stringify(data))
 }

// Méthode utilitaire pour télécharger un fichier JSON à partir du localStorage
export function downloadJSONFromLocalStorage(key?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const imageData = localStorage.getItem('tag-me-up-image')
    const tagsData = localStorage.getItem('tag-me-up-tags')
    if (imageData && tagsData) {
      const currentDate = new Date().toISOString()
      const fileName = `tagmeup-save-${currentDate}.json`
      const blob = new Blob([JSON.stringify({ tags: tagsData, image: imageData })], { type: 'application/json' })

      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = fileName
      a.click()

      URL.revokeObjectURL(a.href)

      resolve()
    } else {
      reject(new Error('No data found in localStorage.'))
    }
  })
}
 