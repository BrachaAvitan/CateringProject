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
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.Extensions.Configuration;
using CateringEFCore.Services;

namespace CateringEFCore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();//àôùåø âéùä

            services.AddControllers();

            services.AddControllers().AddNewtonsoftJson();//äîøä ùì äîæää ùî÷ùø ìèáìä ìñåâ ùì äòîåãä

            //JWT
            services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["JwtToken:Issuer"],
                    ValidAudience = Configuration["JwtToken:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtToken:SecretKey"]))
                };
            });

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

            services.AddScoped(typeof(IDetailsEventDL), typeof(DetailsEventDL));
            services.AddScoped(typeof(IDetailsEventBL), typeof(DetailsEventBL));

            services.AddScoped<IManagerService, ManagerService>();

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

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            //JWT
            app.UseAuthentication();
            // app.UseMvc();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
