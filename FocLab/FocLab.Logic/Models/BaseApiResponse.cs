using System;

namespace FocLab.Logic.Models
{
    /// <summary>
    /// Модель описывающая базовый ответ от какого-либо сервиса
    /// </summary>
    public class BaseApiResponse
    {
        /// <summary>
        /// Создаёт объект <see cref="BaseApiResponse"/>
        /// </summary>
        /// <param name="isSucceeded"></param>
        /// <param name="message"></param>
        public BaseApiResponse(bool isSucceeded, string message)
        {
            IsSucceeded = isSucceeded;
            Message = message;
        }

        /// <summary>
        /// Конструктор для создания ответа из исключения
        /// </summary>
        /// <param name="ex"></param>
        public BaseApiResponse(Exception ex) : this(false, ex.Message)
        {
        }

        /// <summary>
        /// Установлен как true если результат опреации завершился положительно. false, если результат отрицательный
        /// </summary>
        public bool IsSucceeded { get; set; }

        /// <summary>
        /// Сообщение о результате операции
        /// </summary>
        public string Message { get; set; }
    }
}