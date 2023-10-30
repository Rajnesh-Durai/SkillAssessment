using Microsoft.EntityFrameworkCore;
using SkillAssessmentUser.Exceptions;
using SkillAssessmentUser.Model.Core_Model;
using SkillAssessmentUser.Model.View_Model;
using SkillAssessmentUser.Repository.CodeQuestionRepository;

namespace SkillAssessmentUser.Services.CodeAssessmentServices
{
    public class CodeQuestionService:ICodeQuestionService
    {
        #region Properties
        private readonly ICodeQuestionRepository _codeQuestionRepository;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="codeQuestionRepository"></param>
        public CodeQuestionService(ICodeQuestionRepository codeQuestionRepository)
        {
            _codeQuestionRepository = codeQuestionRepository;
        }
        #endregion
        #region Get Random Question
        public async Task<List<RandomQuestionDTO>> GetRandomizedQuestions(string assessmentId, int numberOfQuestions)
        {
            // Query the database to retrieve questions for the given assessment
            var questions = await _codeQuestionRepository.GetAssessmentId(assessmentId);
               

            // Ensure you have enough questions to select from
            if (questions.Count < numberOfQuestions)
            {
                throw new Exception("Not enough questions available for randomization.");
            }

            // Randomly select the desired number of questions
            var random = new Random();
            var selectedQuestions = questions.OrderBy(q => random.Next()).Take(numberOfQuestions);

            // Transform selected questions into RandomQuestionDTO objects
            var randomizedQuestions = selectedQuestions.Select(q => new RandomQuestionDTO
            {
                Id = q.Id,
                AssessmentId = q.AssessmentId,
                Question = q.Question,
                Constraint = q.CodeConstraints,
                Explanation = q.Explanation,
                SampleInput = q.SampleInput,
                SampleOutput = q.SampleOutput,
                Testcase1Question = q.Testcase1Question,
                Testcase1Answer = q.Testcase1Answer,
                Testcase2Question = q.Testcase2Question,
                Testcase2Answer = q.Testcase2Answer,
                Testcase3Question = q.Testcase3Question,
                Testcase3Answer = q.Testcase3Answer
            }).ToList();

            return randomizedQuestions;
        }
        #endregion
    }
}
