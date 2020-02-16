using FocLab.Logic.Models;
using FocLab.Logic.Resources;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FocLab.Logic.Services
{
    public class BaseService
    {
        public BaseService(DbContext context)
        {
            Context = context;
        }

        /// <summary>
        /// Валидировать модель
        /// </summary>
        /// <param name="objectToValidate"></param>
        /// <returns></returns>
        protected BaseApiResponse Validate(object objectToValidate)
        {
            if (objectToValidate == null)
            {
                return new BaseApiResponse(false, MainResources.ModelIsNullObject);
            }

            // The simplest form of validation context. It contains only a reference to the object being validated.
            var vc = new ValidationContext(objectToValidate);

            ICollection<ValidationResult> results = new List<ValidationResult>();

            var isValid = Validator.TryValidateObject(objectToValidate, vc, results, true);

            return new BaseApiResponse(isValid, isValid ? MainResources.ModelIsValid : results.First().ErrorMessage);
        }

        protected async Task<BaseApiResponse> TrySaveChangesAndReturnResultAsync(string successfulMessage)
        {
            try
            {
                await Context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                return new BaseApiResponse(ex);
            }

            return new BaseApiResponse(true, successfulMessage);
        }

        protected DbContext Context { get; }
    }
}