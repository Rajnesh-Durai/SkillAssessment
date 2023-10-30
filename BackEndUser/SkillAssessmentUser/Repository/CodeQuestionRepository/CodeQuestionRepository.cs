using Microsoft.EntityFrameworkCore;
using SkillAssessmentUser.Data;
using SkillAssessmentUser.Exceptions;
using SkillAssessmentUser.Model.Core_Model;
using SkillAssessmentUser.Model.View_Model;

namespace SkillAssessmentUser.Repository.CodeQuestionRepository
{
    public class CodeQuestionRepository:ICodeQuestionRepository
    {
        #region Properties
        private readonly UserEndDataContext _context;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        public CodeQuestionRepository(UserEndDataContext context)
        {
            _context = context;
        }
        #endregion
        #region Random Code Question Repository
        /// <summary>
        /// Get all Allocated Assessment
        /// </summary>
        /// <returns>list of AllocatedAssessment.</returns>
        public async Task<List<CodeQuestion>> GetAssessmentId(string assessmentId)
        {
            try
            {
                var item = await _context.CodeQuestion.Where(a => a.AssessmentId == assessmentId).ToListAsync();
                return item;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<CodeQuestion>(); }
        }
        #endregion

    }
}
