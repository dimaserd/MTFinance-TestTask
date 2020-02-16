using FocLab.Logic.Models;
using FocLab.Model.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FocLab.Logic.Services
{
    public class VirtualServerService : BaseService
    {
        public VirtualServerService(DbContext context) : base(context)
        {
        }

        static readonly Expression<Func<VirtualServer, VirtualServerModel>> SelectExpression = x => new VirtualServerModel
        {
            Id = x.Id,
            CreatedOn = x.CreatedOn,
            RemovedOn = x.RemovedOn
        };

        public Task<BaseApiResponse> CreateVirtualServer()
        {
            var set = Context.Set<VirtualServer>();

            set.Add(new VirtualServer
            {
                CreatedOn = DateTime.Now
            });

            return TrySaveChangesAndReturnResultAsync("Виртульный сервер создан");
        }

        public async Task<BaseApiResponse> DeleteServers(DeleteServers model)
        {
            if (!(model?.Ids?.Length > 0))
            {
                return new BaseApiResponse(false, "Не указаны идентификаторы серверов, которые нужно удалить");
            }

            var set = Context.Set<VirtualServer>();

            //Нахожу сервера, которые нужно удалить, и те которые еще не удалены
            var serversToDelete = await set.Where(x => model.Ids.Contains(x.Id) && !x.RemovedOn.HasValue).ToListAsync();

            if(serversToDelete.Count == 0)
            {
                return new BaseApiResponse(false, "Сервера не найдены по указанным идентификаторам");
            }

            var dateNow = DateTime.Now;

            //Устанавливаем дату удаления
            serversToDelete.ForEach(x => x.RemovedOn = dateNow);

            return await TrySaveChangesAndReturnResultAsync("Удалены виртуальные серверы");
        }

        public Task<List<VirtualServerModel>> GetServers()
        {
            return Context.Set<VirtualServer>().Select(SelectExpression).ToListAsync();
        }
    }
}