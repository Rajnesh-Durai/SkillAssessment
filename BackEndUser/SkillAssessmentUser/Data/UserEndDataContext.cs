using Microsoft.EntityFrameworkCore;
using SkillAssessmentUser.Model.Core_Model;

namespace SkillAssessmentUser.Data
{
    public class UserEndDataContext:DbContext
    {
        public UserEndDataContext(DbContextOptions<UserEndDataContext> options) : base(options) { }

        public DbSet<CodeQuestion> CodeQuestion { get; set; }
        public DbSet<QuestionPage> QuestionPage { get; set; }
    }
}
