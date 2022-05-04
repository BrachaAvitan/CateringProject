using CateringEFCore.Classes;
using Entity.Converter;
using Entity.DTO;
using Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class RecipesToOrderDL : IRecipesToOrderDL
    {
        private readonly CateringDBContext db;

        public RecipesToOrderDL(CateringDBContext _db)
        {
            this.db = _db;
        }
        public async Task DeleteRecipeToOrderAsync(int id)
        {
            db.TblRecipesToOrder.Remove(db.TblRecipesToOrder.FirstOrDefault(r => r.RecipesToOrderId == id));
            await db.SaveChangesAsync();
        }
        public async Task<List<RecipesToOrderDTO>> GetRecipesToOrderAsync(int eventId, int managerId)
        {
            return await db.TblRecipesToOrder.Where(r => r.EventId == eventId && r.Recipes.ManagerId == managerId)
                .Include(r => r.Recipes).ThenInclude(r => r.DoseType).Include(r => r.Recipes).ThenInclude(r => r.Menu)
                .Select(r => RecipesToOrderConverter.ConvertToRecipeDTO(r)).ToListAsync();
        }

        public async Task<List<TblRecipesToOrder>> GetRecipesOfOneEventAsync(int eventId, int managerId)
        {
            return await db.TblRecipesToOrder.Where(r => r.EventId == eventId && r.Recipes.ManagerId == managerId)
                .Include(r => r.Recipes)
                .ThenInclude(r => r.TblProductsToRecipe)
                .ThenInclude(p => p.Product)
                .ThenInclude(p => p.TypeOfMeasurement).ToListAsync();
        }

        public async Task<List<RecipeDTO>> GetRecipes(int eventId, int managerId)
        {
            return await db.TblRecipesToOrder.Where(r => r.EventId == eventId && r.Recipes.ManagerId == managerId).Include(r => r.Recipes).ThenInclude(r => r.DoseType).
                Include(r => r.Recipes).ThenInclude(r => r.Menu).Select(r => RecipeConvertter.convertToRecipeDTO(r.Recipes)).ToListAsync();
        }

        public async Task<TblRecipesToOrder> GetRecipeToOrderAsync(int id)
        {
            return await db.TblRecipesToOrder.FirstOrDefaultAsync(r => r.RecipesToOrderId == id);
        }

        public async Task InsertRecipeToOrderAsync(TblRecipesToOrder recipe)
        {
            await db.TblRecipesToOrder.AddAsync(recipe);
            await db.SaveChangesAsync();
        }

        public async Task UpdateRecipeToOrderAsync(TblRecipesToOrder recipe)
        {
            TblRecipesToOrder rUpdate = db.TblRecipesToOrder.FirstOrDefault(r => r.RecipesToOrderId == recipe.RecipesToOrderId);
            if (rUpdate != null)
            {
                rUpdate.EventId = recipe.EventId;
                rUpdate.RecipesId = recipe.RecipesId;
                rUpdate.Amount = recipe.Amount;
                await db.SaveChangesAsync();
            }

        }

        //פונקציה לחישוב מלאי
        //input - eventId, managerId -- מזהה אירוע ומזהה בעל קייטרינג 
        //output - dictionary : 
        //key: nameProduct(string),
        //value: object typeof ProductManagementDTO: {NameProduct, QuantityInStock, QuantityPerEvent, TypeOfMeasurement}
        //עוברים על כל המתכונים להזמנה ועבור כל מתכון:
        //dictionary עוברים על הרכיבים שלו ומכניסים ל
        //אם המוצר לא קיים: את שם המוצר,סוג המדידה ,הכמות במלאי ואת הכמות הנדרשת לאירוע זה:
        //הכמות הנדרשת: הכמות הדרושה להזמנה לחלק לכמות מתכון
        //ואם המוצר קיים אז מוסיפים לכמות הקיימת את הכמות הנדרשת
        //dictionary של ה values ומחזירים בסוף את ה
        public async Task<List<ProductManagementDTO>> InventoryCalculation(int managerId, RangeDate rangeDate)
        {
            List<int> events = db.TblDetailsEvent.Where(d => d.ManagerId == managerId && d.StartDate.Date >= rangeDate.dateMin && d.EndDate.Date <= rangeDate.dateMax).Select(d => d.EventId).ToList();
            Dictionary<string, ProductManagementDTO> products = new Dictionary<string, ProductManagementDTO>();
            ProductManagementDTO product;
            foreach(int eventId in events)
            { 
                List<TblRecipesToOrder> recipesToOrders = await GetRecipesOfOneEventAsync(eventId, managerId);
                foreach (TblRecipesToOrder recipeToOrder in recipesToOrders)
                {
                    double amount = Convert.ToDouble(recipeToOrder.Amount / recipeToOrder.Recipes.QuantityOfPortions);
                    foreach (TblProductsToRecipe productToRecipe in recipeToOrder.Recipes.TblProductsToRecipe)
                    {
                        double count = productToRecipe.AmountToRecipe * amount;

                        if (!products.ContainsKey(productToRecipe.Product.ProductName))
                        {
                            product = new ProductManagementDTO()
                            {
                                NameProduct = productToRecipe.Product.ProductName,
                                QuantityInStock = Convert.ToDouble(productToRecipe.Product.QuantityInStock),
                                TypeOfMeasurement = productToRecipe.Product.TypeOfMeasurement.TypeOfMeasurement,
                                QuantityPerEvent = count
                            };
                            products.Add(productToRecipe.Product.ProductName, product);
                        }
                        else
                        {
                            products[productToRecipe.Product.ProductName].QuantityPerEvent += count;
                        }
                    }
                }
            }
            return products.Values.ToList();
        }
    }

}