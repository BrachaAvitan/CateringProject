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
            services.AddCors();//אפשור גישה

            services.AddControllers();

            services.AddControllers().AddNewtonsoftJson();//המרה של המזהה שמקשר לטבלה לסוג של העמודה

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
