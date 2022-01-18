module.exports = {
  extends: ['@ifit/conventional-commit'],
  ignores: [(commit) => commit.includes('build(release)')]
}
