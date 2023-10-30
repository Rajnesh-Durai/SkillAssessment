using System.ComponentModel.DataAnnotations;

namespace SkillAssessmentUser.Model.View_Model
{
    public class RandomQuestionDTO
    {
        public int Id { get; set; }
        public string AssessmentId { get; set; } = string.Empty;

        public string Question { get; set; } = string.Empty;
        public string Constraint { get; set; } = string.Empty;

        public string Explanation { get; set; } = string.Empty;

        public string SampleInput { get; set; } = string.Empty;

        public string SampleOutput { get; set; } = string.Empty;

        public string Testcase1Question { get; set; } = string.Empty;

        public string Testcase1Answer { get; set; } = string.Empty;
        public string Testcase2Question { get; set; } = string.Empty;

        public string Testcase2Answer { get; set; } = string.Empty;
        public string Testcase3Question { get; set; } = string.Empty;

        public string Testcase3Answer { get; set; } = string.Empty;
    }
}
