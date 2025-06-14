const ClearEmptyFiles = (files: File[]) => {
    const clearedFiles: File[] = []
    files.forEach((file) => {
        if (file.size > 0) {
            clearedFiles.push(file)
        }
    })
    return clearedFiles
}
export default ClearEmptyFiles