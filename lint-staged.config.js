import micromatch from 'micromatch'

export default async (allStagedFiles) => {
  const allStagedTsFiles = micromatch(allStagedFiles, ['**/*.ts'])

  if (allStagedTsFiles.length > 0) {
    return [`ts-standard --fix ${allStagedTsFiles.join(' ')}`]
  }

  return []
}
