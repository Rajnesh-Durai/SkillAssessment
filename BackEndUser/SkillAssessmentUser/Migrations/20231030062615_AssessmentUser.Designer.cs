﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SkillAssessmentUser.Data;

#nullable disable

namespace SkillAssessmentUser.Migrations
{
    [DbContext(typeof(UserEndDataContext))]
    [Migration("20231030062615_AssessmentUser")]
    partial class AssessmentUser
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("SkillAssessmentUser.Model.Core_Model.CodeQuestion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AssessmentId")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("nvarchar(25)");

                    b.Property<string>("CodeConstraints")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("Explanation")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("Question")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<int?>("QuestionPageId")
                        .HasColumnType("int");

                    b.Property<string>("SampleInput")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("SampleOutput")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Testcase1Answer")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Testcase1Question")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Testcase2Answer")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Testcase2Question")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Testcase3Answer")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Testcase3Question")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("QuestionPageId");

                    b.ToTable("CodeQuestion");
                });

            modelBuilder.Entity("SkillAssessmentUser.Model.Core_Model.QuestionPage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CodeQuestionId")
                        .HasColumnType("int");

                    b.Property<string>("EmpId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Points")
                        .HasMaxLength(5000)
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("QuestionPage");
                });

            modelBuilder.Entity("SkillAssessmentUser.Model.Core_Model.CodeQuestion", b =>
                {
                    b.HasOne("SkillAssessmentUser.Model.Core_Model.QuestionPage", null)
                        .WithMany("QuestionPages")
                        .HasForeignKey("QuestionPageId");
                });

            modelBuilder.Entity("SkillAssessmentUser.Model.Core_Model.QuestionPage", b =>
                {
                    b.Navigation("QuestionPages");
                });
#pragma warning restore 612, 618
        }
    }
}
