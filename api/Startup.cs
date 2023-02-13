using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Middleware;
using api.Repositories;
using api.Repositories.Interfaces;
using api.ScheduledJobs;
using api.TypeHandlers;
using Coravel;
using Dapper;
using Microsoft.OpenApi.Models;
using Z.Dapper.Plus;

namespace api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Boolean isDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development" ? true : false;
            services.AddScoped<IDonationRecordRepository, DonationRecordRepository>();
            services.AddScoped<INewDonorRecordRepository, NewDonorRecordRepository>();
            services.AddTransient<RetrieveDataFromGithub>();
            services.AddScheduler();
            services.AddCors();
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "api", Version = "v1" });
            });
            SqlMapper.AddTypeHandler(new DateOnlyTypeHandler());
            DapperPlusManager.AddValueConverter<DateOnly>(new DateOnlyTypeHandlerPlus());
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "api v1"));
            }

            string clientUrl = Configuration.GetValue<string>("ClientUrl") ?? Environment.GetEnvironmentVariable("CLIENT_URL");
            Console.WriteLine(clientUrl);
            
            app.Use(async (context, next) =>
            {
                // Log/Print all Headers
                foreach (var header in context.Request.Headers)
                {
                    logger.LogInformation("Header: {Key}: {Value}", header.Key, header.Value);
                }
            
                logger.LogInformation("Request Method: {Method}", context.Request.Method);
                logger.LogInformation("Request Scheme: {Scheme}", context.Request.Scheme);
                logger.LogInformation("Request Path: {Path}", context.Request.Path);
            
                await next();
            });
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseRouting();
            app.UseCors(opt => 
            {
                opt.AllowAnyHeader().AllowAnyMethod().WithOrigins(clientUrl);
            });
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            var provider = app.ApplicationServices;
            provider.UseScheduler(schedular => 
            {
                schedular.Schedule<RetrieveDataFromGithub>()
                    .DailyAt(8 + 8, 0)
                    .RunOnceAtStart(); //for development purpose
            });
        }
    }
}