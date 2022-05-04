using BL;
using Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Classes
{
    public class ProductManagement
    {
        private readonly IRecipesToOrderBL recipesToOrderBL;

        public ProductManagement(IRecipesToOrderBL _recipesToOrderBL)
        {
            this.recipesToOrderBL = _recipesToOrderBL;
        }

        //פונקציה לחישוב מלאי
        //input - eventId, managerId -- מזהה אירוע ומזהה בעל קייטרינג 
        //output - dictionary : key-nameProduct(string), value-count to order(double).
        //עוברים על כל המתכונים להזמנה ועבור כל מתכון:
        //dictionary עוברים על הרכיבים שלו ומכניסים ל
        //אם המוצר לא קיים את שם המוצר והכמות הנדרשת כפול מס הפעמים להכנת המתכון...
        //ואם המוצר קיים אז מוסיפים לכמות הקיימת את הכמות הנדרשת
        //dictionary ומחזירים בסוף את ה
        public async Task<Dictionary<string, double>> InventoryCalculation(int eventId, int managerId)
        {
            List<TblRecipesToOrder> recipesToOrders = await recipesToOrderBL.GetRecipesOfOneEventAsync(eventId, managerId);
            Dictionary<string, double> products = new Dictionary<string, double>();
            foreach (TblRecipesToOrder recipeToOrder in recipesToOrders)
            {
                //recipeToOrder.Amount - במקום זה:
                //לקחת את הכמות הדרושה להזמנה לחלק לכמות מתכון
                double amount = Convert.ToDouble(recipeToOrder.Amount / recipeToOrder.Recipes.QuantityOfPortions);
                //double count = Convert.ToDouble(productToRecipe.AmountToRecipe * amount);
                foreach (TblProductsToRecipe productToRecipe in recipeToOrder.Recipes.TblProductsToRecipe)
                {
                    double count = productToRecipe.AmountToRecipe * amount;
                    if (!products.ContainsKey(productToRecipe.Product.ProductName))
                    {
                        products.Add(productToRecipe.Product.ProductName, count);
                    }
                    else
                    {
                        products[productToRecipe.Product.ProductName] += count;
                    }
                }
            }
            return products;
        }
    }
}
