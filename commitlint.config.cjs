
const Configuration = {
  /*
  * Resolve and load @commitlint/config-conventional from node_modules.
  * Referenced packages must be installed
  */
  extends: ['@ifit/conventional-commit'],
  /*
   * Functions that return true if commitlint should ignore the given message.
   */
  ignores: [(commit) => commit.includes('build(release)')]
}

module.exports = Configuration
