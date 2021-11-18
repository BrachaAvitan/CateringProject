using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL;
using DAL;
using Entity.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;


namespace CateringEFCore
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();//àôùåø âéùä

            services.AddControllers();

            services.AddControllers().AddNewtonsoftJson();//äîøä ùì äîæää ùî÷ùø ìèáìä ìñåâ ùì äòîåãä

            services.AddScoped(typeof(ICategoriesDL), typeof(CategoriesDL));
            services.AddScoped(typeof(ICategoriesBL), typeof(CategoriesBL));

            services.AddScoped(typeof(IProductDL), typeof(ProductDL));
            services.AddScoped(typeof(IProductBL), typeof(ProductBL));

            services.AddScoped(typeof(IToolDL), typeof(ToolDL));
            services.AddScoped(typeof(IToolBL), typeof(ToolBL));

            services.AddScoped(typeof(IRecipeDL), typeof(RecipeDL));
            services.AddScoped(typeof(IRecipeBL), typeof(RecipeBL));

            services.AddScoped(typeof(IManagerDL), typeof(ManagerDL));
            services.AddScoped(typeof(IManagerBL), typeof(ManagerBL));

            services.AddScoped(typeof(IDoseTypeDL), typeof(DoseTypeDL));
            services.AddScoped(typeof(IDoseTypeBL), typeof(DoseTypeBL));

            services.AddScoped(typeof(ITypeOfMeasurementþDL), typeof(TypeOfMeasurementDL));
            services.AddScoped(typeof(ITypeOfMeasurementBL), typeof(TypeOfMeasurementBL));

            services.AddScoped(typeof(IProductsToRecipeDL), typeof(ProductsToRecipeDL));
            services.AddScoped(typeof(IProductsToRecipeBL), typeof(ProductsToRecipeBL));

            services.AddScoped(typeof(IRecipesToOrderDL), typeof(RecipesToOrderDL));
            services.AddScoped(typeof(IRecipesToOrderBL), typeof(RecipesToOrderBL));

            services.AddScoped(typeof(IMenuTypesDL), typeof(MenuTypesDL));
            services.AddScoped(typeof(IMenuTypesBL), typeof(MenuTypesBL));

            //details Event AddScoped-- not forget!!

            services.AddControllersWithViews()
                          .AddNewtonsoftJson(options =>
                      options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddDbContext<CateringDBContext>(options =>
            options.UseSqlServer("Data Source=.;Initial Catalog=CateringDB;Integrated Security=True;Pooling=False"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(options =>
            options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            // app.UseMvc();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
