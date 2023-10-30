using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SkillAssessmentUser.Migrations
{
    /// <inheritdoc />
    public partial class AssessmentUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "QuestionPage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmpId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CodeQuestionId = table.Column<int>(type: "int", nullable: false),
                    Points = table.Column<int>(type: "int", maxLength: 5000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionPage", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CodeQuestion",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AssessmentId = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false),
                    Question = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    CodeConstraints = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Explanation = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    SampleInput = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SampleOutput = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Testcase1Question = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Testcase1Answer = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Testcase2Question = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Testcase2Answer = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Testcase3Question = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Testcase3Answer = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    QuestionPageId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CodeQuestion", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CodeQuestion_QuestionPage_QuestionPageId",
                        column: x => x.QuestionPageId,
                        principalTable: "QuestionPage",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CodeQuestion_QuestionPageId",
                table: "CodeQuestion",
                column: "QuestionPageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CodeQuestion");

            migrationBuilder.DropTable(
                name: "QuestionPage");
        }
    }
}
