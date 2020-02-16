using FocLab.Model.Contexts;
using Microsoft.EntityFrameworkCore.Design;

namespace FocLab.Model
{
    public class FocLabDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        const string LocalConnection = "Server=(localdb)\\mssqllocaldb;Database=aspnet-TestServersApp-53bc9b9d-9d6a-45d4-8429-2a2761773502;Trusted_Connection=True;MultipleActiveResultSets=true";

        public ApplicationDbContext CreateDbContext(string[] args)
        {
            return ApplicationDbContext.Create(LocalConnection);
        }
    }
}