﻿using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IRecipeDL
    {
        //Get All Recipes By managerId
        Task<List<RecipeDTO>> GetRecipesAsync(int managerId);

        //Get Recipes By DoseTypeId & managerId
        Task<List<RecipeDTO>> GetRecipesByDoseId(int doseTypeId, int managerId);

        //Get Recipe By Id & managerId
        Task<TblRecipes> GetRecipeAsync(int id, int managerId);

        //Insert Recipe
        Task<int> InsertRecipeAsync(TblRecipes recipe);

        //Update Recipe
        Task UpdateRecipeAsync(TblRecipes recipe);

        //Delete Recipe
        Task DeleteRecipeAsync(int id, int managerId);
    }
}
