using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace FocLab
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>().ConfigureKestrel((context, options) =>
                {
                    options.Limits.Http2.MaxStreamsPerConnection = 100;
                });
    }
}