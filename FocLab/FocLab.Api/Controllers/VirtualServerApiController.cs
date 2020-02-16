using FocLab.Logic.Models;
using FocLab.Logic.Services;
using FocLab.Model.Contexts;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FocLab.Api.Controllers
{
    [Route("Api/VirtualServer")]
    public class VirtualServerApiController : Controller
    {
        VirtualServerService VirtualServerService => new VirtualServerService(Context);

        ApplicationDbContext Context { get; }

        public VirtualServerApiController(ApplicationDbContext context)
        {
            Context = context;
        }

        [HttpPost("Get")]
        public Task<List<VirtualServerModel>> GetServers()
        {
            return VirtualServerService.GetServers();
        }

        [HttpPost("Create")]
        public Task<BaseApiResponse> CreateServer()
        {
            return VirtualServerService.CreateVirtualServer();
        }

        [HttpPost("Delete")]
        public Task<BaseApiResponse> DeleteServers(DeleteServers model)
        {
            return VirtualServerService.DeleteServers(model);
        }
    }
}