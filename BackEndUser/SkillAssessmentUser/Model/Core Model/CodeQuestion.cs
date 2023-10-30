using System.ComponentModel.DataAnnotations;

namespace SkillAssessmentUser.Model.Core_Model
{
    public class CodeQuestion
    {
        [Key]
        public int Id { get; set; }

        [StringLength(25)]
        public string AssessmentId { get; set; } = string.Empty;

        [Required(ErrorMessage = "Question is required.")]
        [StringLength(500)] 
        public string Question { get; set; } = string.Empty;

        [StringLength(200)]
        public string CodeConstraints { get; set; } = string.Empty;

        [StringLength(500)] 
        public string Explanation { get; set; } = string.Empty;

        [StringLength(50)] 
        public string SampleInput { get; set; } = string.Empty;

        [StringLength(50)]
        public string SampleOutput { get; set; } = string.Empty;

        [StringLength(50)] 
        public string Testcase1Question { get; set; } = string.Empty;

        [StringLength(50)]
        public string Testcase1Answer { get; set; } = string.Empty;
        [StringLength(50)]
        public string Testcase2Question { get; set; } = string.Empty;

        [StringLength(50)]
        public string Testcase2Answer { get; set; } = string.Empty;
        [StringLength(50)]
        public string Testcase3Question { get; set; } = string.Empty;

        [StringLength(50)]
        public string Testcase3Answer { get; set; } = string.Empty;
    }
}
