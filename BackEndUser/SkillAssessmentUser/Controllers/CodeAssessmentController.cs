using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillAssessmentUser.Model.Core_Model;
using SkillAssessmentUser.Model.View_Model;
using SkillAssessmentUser.Services.CodeAssessmentServices;
using System.Data;

namespace SkillAssessmentUser.Controllers
{
    [Route("allocatedassessment")]
    [ApiController]
/*    [Authorize(Roles = "Employee")]*/
    public class CodeAssessmentController:ControllerBase
    {
        #region Properties
        private readonly ICodeQuestionService _codeQuestionService;
        private readonly ILogger<CodeAssessmentController> _logger;
        #endregion

        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="allottedAssessmentService"></param>
        /// <param name="logger"></param>

        public CodeAssessmentController(ICodeQuestionService codeQuestionService, ILogger<CodeAssessmentController> logger)
        {
            _logger = logger;
            _codeQuestionService = codeQuestionService;
        }
        #endregion

        #region Get All Code Questions for an Employee
        /// <summary>
        /// Retrieves a list of code questions
        /// </summary>
        /// <returns>a list of code questions.</returns>
        [HttpGet("randomquestion")]
        public async Task<ActionResult<List<CodeQuestion>>> GetCodeQuestions(string assessmentId, int questionNumber)
        {
            _logger.LogInformation("Get the particuler assessmentId:{assessmentId}", assessmentId);
            var get = await _codeQuestionService.GetRandomizedQuestions(assessmentId, questionNumber);
            _logger.LogInformation("Returned values: {get}", get);
            return Ok(get);
        }
        #endregion
    }
}
