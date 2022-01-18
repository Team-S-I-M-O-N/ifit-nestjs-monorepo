import { BackendArchitecture } from './application.factory'

export interface ApplicationOptions {
  /**
   * Nest application name.
   */
  name: string

  /**
   * Backend architecture
   */
  architecture: BackendArchitecture
  /**
   * Nest application author.
   */
  author?: string
  /**
   * Nest application description.
   */
  description?: string
  /**
   * Nest application package manager.
   */
  packageManager?: 'yarn'
  /**
   * Nest application destination directory.
   */
  directory?: string
  /**
   * Nest application version.
   */
  version?: string
}
