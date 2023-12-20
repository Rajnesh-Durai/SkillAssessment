using SkillAssessmentUser.Model.Core_Model;
using SkillAssessmentUser.Model.View_Model;

namespace SkillAssessmentUser.Services.CodeAssessmentServices
{
    public interface ICodeQuestionService
    {
        Task<List<RandomQuestionDTO>> GetRandomizedQuestions(string assessmentId, int numberOfQuestions);
     /*   Task<QuestionPage> PostQuestion(QuestionPage questionPage);*/
    }
}
