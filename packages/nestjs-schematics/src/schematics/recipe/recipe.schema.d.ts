import { RecipeEnum } from './recipe.factory'

export interface RecipeOptions {
  /**
   * Recipe
   */
  recipe: RecipeEnum

  // application name
  name?: string
}
