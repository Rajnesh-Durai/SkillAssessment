using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillAssessmentUser.Model.Core_Model
{
    public class QuestionPage
    {
        [Key]
        public int Id { get; set; }
        public string EmpId { get; set; }=string.Empty;
        [ForeignKey("CodeQuestion")]
        public int CodeQuestionId { get; set; }
        [StringLength(5000)]
        public int? Points { get; set; }
        public ICollection<CodeQuestion>? QuestionPages { get; set; }
    }
}
