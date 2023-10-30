using SkillAssessmentUser.Model.Core_Model;
using SkillAssessmentUser.Model.View_Model;

namespace SkillAssessmentUser.Repository.CodeQuestionRepository
{
    public interface ICodeQuestionRepository
    {
        Task<List<CodeQuestion>> GetAssessmentId(string assessmentId);   
    }
}
