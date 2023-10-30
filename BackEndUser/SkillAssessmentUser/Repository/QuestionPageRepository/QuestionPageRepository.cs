using SkillAssessmentUser.Data;

namespace SkillAssessmentUser.Repository.QuestionPageRepository
{
    public class QuestionPageRepository:IQuestionPageRepository
    {
        #region Properties
        private readonly UserEndDataContext _userEndDataContext;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        public QuestionPageRepository(UserEndDataContext userEndDataContext)
        {
            _userEndDataContext = userEndDataContext;
        }
        #endregion

    }
}
